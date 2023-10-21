import { CSSProperties, FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IOrder } from '../../models/interfaces';
import { useNavigate } from 'react-router-dom';
import {
    fetchOrders,
    selectError,
    selectLoading,
    selectOrders,
    selectUser
} from '../../redux/slices/personalAccountSlice';
import style from './Orders.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Order from '../Order/Order';

const Orders: FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const orders = useAppSelector(selectOrders);

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            dispatch(fetchOrders(user._id));
        }
    }, []);

    const tableContainerStyle: CSSProperties = {
        boxShadow: `0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)`,
        borderRadius: '10px'
    };

    const renderEmptyRowWithMessage = (message: string) => {
        return (
            <TableRow>
                <TableCell colSpan={10} align="center">
                    <span className={style.Message}>
                        { message }
                    </span>
                </TableCell>
            </TableRow>
        );
    }

    const renderOrders = (orders: IOrder[]) => {
        if (loading) {
            return renderEmptyRowWithMessage(
                'Идёт загрузка. Ожидайте...'
            );
        } else if (error) {
            return renderEmptyRowWithMessage(
                'Произошла ошибка во время загрузки ваших заказов'
            );
        } else if (orders.length === 0) {
            return renderEmptyRowWithMessage(
                'У вас ещё нет заказов'
            );
        } else {
            return orders.map((order: IOrder) => <Order order={order} />);
        }
    }

    return (
        <TableContainer
            style={tableContainerStyle}
            component={Paper}
            sx={{ width: '100%' }}
        >
            <Table aria-label="collapsible table" className={style.Table}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center"> № заказа </TableCell>
                        <TableCell align="center"> Дата </TableCell>
                        <TableCell align="center"> Время </TableCell>
                        <TableCell align="center"> Адресс </TableCell>
                        <TableCell align="center"> Стоимость ($) </TableCell>
                        <TableCell align="center"> Статус доставки </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderOrders(orders)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Orders;