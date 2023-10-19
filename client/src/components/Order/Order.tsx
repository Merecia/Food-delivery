import { FC, useState } from 'react';
import { IOrderedFood, IOrder } from '../../models/interfaces';
import { DeliveryStatus } from '../../models/enums';
import { getPrettyAddress } from '../../utils/formatting';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import style from './Order.module.scss';

interface IOrderProps {
    order: IOrder;
}

const Order: FC<IOrderProps> = ({ order }) => {
    const [open, setOpen] = useState<boolean>(false);

    const colors = {
        [DeliveryStatus.WAS_PLACED]: 'rgb(57, 141, 250)',
        [DeliveryStatus.WAS_CONFIRMED]: 'rgb(42, 250, 146)',
        [DeliveryStatus.IS_BEING_DELIVERED]: 'rgb(248, 25, 248)',
        [DeliveryStatus.WAS_CANCELED]: 'rgb(219, 89, 64)',
        [DeliveryStatus.WAS_DELIVERED]: 'rgb(254,114,76)',
    };

    type colorType = keyof typeof colors;
    const color = order.status as colorType;
    
    const createdAt = new Date(order.createdAt as string);

    const renderOrderedFood = (orderedFood: IOrderedFood[], open: boolean) => {
        const renderTableHead = (headerNames: string[]) => {
            return headerNames.map((headerName: string) => (
                <TableCell align="center"> {headerName} </TableCell>
            ));
        }

        const renderTableBody = (orderedFood: IOrderedFood[]) => {
            return orderedFood.map((foodItem) => {
                return (
                    <TableRow key={foodItem.foodId}>
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
                        <Box sx={{ margin: "15px 0px 20px 0px" }}>
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

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {order._id}
                </TableCell>
                <TableCell align="center">
                    {createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                    {createdAt.toLocaleTimeString()}
                </TableCell>
                <TableCell align="center">
                    {getPrettyAddress(order.address)}
                </TableCell>
                <TableCell align="center">
                    {order.totalCost}
                </TableCell>
                <TableCell align="center">
                    <div
                        className={style.StatusCircle}
                        style={{ backgroundColor: colors[color] }}
                    >
                    </div>
                    {order.status}
                </TableCell>
            </TableRow>

            {renderOrderedFood(order.orderedFood, open)}
        </>
    );
}

export default Order;