import { CSSProperties, FC, useState } from 'react';
import { IOrderInfo, IOrderedFood, DeliveryStatus } from '../../types';
import { orders } from '../../data';
import style from './Orders.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Orders: FC = () => {
    const renderOrderedFood = (orderedFood: IOrderedFood[], open: boolean) => {
        const renderTableHead = (headerNames: string[]) => {
            return headerNames.map((headerName: string) => (
                <TableCell align="center"> {headerName} </TableCell>
            ));
        }

        const renderTableBody = (orderedFood: IOrderedFood[]) => {
            return orderedFood.map((foodItem) => {
                return (
                    <TableRow key={foodItem._id}>
                        <TableCell align="center">
                            {foodItem.name}
                        </TableCell>
                        <TableCell align="center">
                            {foodItem.price}
                        </TableCell>
                        <TableCell align="center">
                            {foodItem.amount}
                        </TableCell>
                        <TableCell align="center">
                            {foodItem.totalCost}
                        </TableCell>
                    </TableRow>
                );
            });
        }

        const title = "Список заказанной еды";

        const headerNames = [
            "Название",
            "Цена за 1 шт. ($)",
            "Количество",
            "Общая цена ($)"
        ];

        return (
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: '15px 0px 20px 0px' }}>
                            <h2 className={style.DropdownTable_Title}>
                                {title}
                            </h2>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {renderTableHead(headerNames)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderTableBody(orderedFood)}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        );
    }

    const renderOrderInfo = (orderInfo: IOrderInfo) => {
        const [open, setOpen] = useState<boolean>(false);

        const colors = {
            [DeliveryStatus.WAS_PLACED]: 'rgb(57, 141, 250)',
            [DeliveryStatus.WAS_CONFIRMED]: 'rgb(42, 250, 146)',
            [DeliveryStatus.IS_BEING_DELIVERED]: 'rgb(248, 25, 248)',
            [DeliveryStatus.WAS_CANCELED]: 'rgb(219, 89, 64)',
            [DeliveryStatus.WAS_DELIVERED]: 'rgb(254,114,76)',
        };

        type colorType = keyof typeof colors;
        const color = orderInfo.status as colorType;

        return (
            <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center"> {orderInfo._id} </TableCell>
                    <TableCell align="center"> {orderInfo.date} </TableCell>
                    <TableCell align="center"> {orderInfo.time} </TableCell>
                    <TableCell align="center"> {orderInfo.address} </TableCell>
                    <TableCell align="center"> {orderInfo.totalCost} </TableCell>
                    <TableCell align="center"> 
                        <div
                            className={style.StatusCircle} 
                            style = {{ backgroundColor: colors[color] }}
                        >
                        </div>
                        {orderInfo.status} 
                    </TableCell>
                </TableRow>

                {renderOrderedFood(orderInfo.orderedFood, open)}
            </>
        );
    }

    const tableContainerStyle: CSSProperties = {
        boxShadow: `0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)`,
        borderRadius: '10px'
    };

    return (
        <TableContainer style = {tableContainerStyle} component={Paper}>
            <Table aria-label="collapsible table" className={style.Table}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center"> № заказа </TableCell>
                        <TableCell align="center"> Дата </TableCell>
                        <TableCell align="center"> Время </TableCell>
                        <TableCell align="center"> Адресс </TableCell>
                        <TableCell align="center"> Стоимость </TableCell>
                        <TableCell align="center"> Статус доставки </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => renderOrderInfo(order))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Orders;