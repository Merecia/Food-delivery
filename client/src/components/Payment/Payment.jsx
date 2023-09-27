import React, { useState } from 'react'
import style from './Payment.module.css'

import Button from './Button/Button'
import cardImg from './images/cardImg.png'

import { useForm } from "react-hook-form"

import { actionType } from '../../Redux/reducer'
import { useStateValue } from '../../Redux/StateProvider'

import { getDatabase, ref, set } from "firebase/database"
import { child, get } from "firebase/database";

import firebase from '../../Firebase/firebase'

const Payment = () => {

    const [{ modal, cost, cart }, dispatch] = useStateValue()

    const [choice, setChoice] = useState('cash')

    const [isFinished, setIsFinished] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const isEmptyObject = object => Object.keys(object).length === 0

    const handleChange = event => setChoice(event.target.value)

    const onSubmit = handleSubmit(data => {

        getLastId().then(lastId => {
            const id = lastId + 1
            const name = data.name
            const phone = data.phone
            const address = data.address
            const paymentType = choice
            const order = cart

            writeOrderData(id, name, phone, address, order, cost, paymentType)

            setIsFinished(true)
        })

    })

    const writeOrderData = (id, name, phone, address, order, cost, paymentType) => {

        const db = getDatabase();

        set(ref(db, 'Orders/' + id), {
            id: id,
            fullName: name,
            phone: phone,
            address: address,
            order: order,
            cost: cost,
            paymentType: paymentType
        });

    }

    const getLastId = () => {

        let result

        const dbRef = ref(getDatabase())

        result = get(child(dbRef, `Orders`)).then(snapshot => {

            if (snapshot.exists()) {

                let orderObject = snapshot.val()

                let orderNames = Object.keys(orderObject)

                let orders = orderNames.map(orderName => orderObject[orderName])

                let lastId = orders.map(order => order.id).sort().pop()

                return lastId
            }

            else return 0

        }).catch(error => console.log(error))

        return result

    }

    const closeButtonClick = () => {

        if (isFinished) {

            dispatch({
                type: actionType.SET_COST,
                cost: 0
            })

            dispatch({
                type: actionType.SET_CART,
                cart: []
            })

            setIsFinished(false)

        }

        dispatch({
            type: actionType.SET_MODAL,
            modal: false
        })
    }

    console.log(errors)

    return (
        <div className={modal ? style.Payment__open : style.Payment__close}>

            <form className={style.Form} onSubmit={event => event.preventDefault()}>

                <button className={style.closeButton} onClick={closeButtonClick}> ✗ </button>

                {
                    !isEmptyObject(errors)
                        ? <p className={style.Error}> Произошла ошибка! Проверьте правильность введённых данных </p>
                        : null
                }

                {
                    isFinished && choice === 'cash'
                        ? <p className={style.Success}> Вы выбрали оплату наличными. Ожидайте доставку. </p>
                        : null
                }

                {
                    isFinished && choice === 'card'
                        ? <p className={style.Success}> Платёж успешно обработан. Ожидайте доставку. </p>
                        : null
                }

                <input
                    type="text"
                    placeholder="Введите имя и фамилию"
                    {...register('name', { required: 'Заполните это поле' })}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder='Введите свой номер телефона'
                    {
                        ...register(
                            'phone',
                            {
                                required: 'Заполните это поле',
                                pattern: {
                                    value: /^\+?(38)?0\d{9}$/,
                                    message: "invalid phone"
                                }
                            }
                        )
                    }
                />

                <input
                    type="text"
                    placeholder="Введите свой адресс"
                    {...register('address', { required: 'Заполните это поле' })}
                />

                <div className={style.Cost}>
                    <span> Всего к оплате: </span>
                    <span> ₴ {cost}  </span>
                </div>

                <div className={style.Choice}>
                    <p> Выберите способ оплаты: </p>

                    <div>

                        <input
                            type="radio"
                            id="cash"
                            name="contact"
                            value="cash"
                            checked={choice === 'cash'}
                            onChange={event => handleChange(event)}
                        />
                        <label htmlFor="cash"> Наличные </label>

                        <input
                            type="radio"
                            id="card"
                            name="choice"
                            value="card"
                            checked={choice === "card"}
                            onChange={event => handleChange(event)}
                        />
                        <label htmlFor="card"> Карта </label>

                    </div>

                </div>

                {
                    choice === 'card'
                        ?
                        <div className={style.Card}>

                            <hr />

                            <img src={cardImg} alt="cart" className={style.CardImg} />

                            <div className={style.CardTop}>

                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder='Номер карты'
                                    {
                                    ...register(
                                        'cardNumber',
                                        {
                                            required: 'Заполните это поле',
                                            pattern: {
                                                value: /^\d{16}$/,
                                                message: "invalid CardNumber"
                                            }
                                        }
                                    )
                                    }
                                />

                            </div>


                            <div className={style.CardBottom}>

                                <input
                                    type="text"
                                    name="month"
                                    placeholder='ММ'
                                    {
                                    ...register(
                                        'month',
                                        {
                                            required: 'Заполните это поле',
                                            pattern: {
                                                value: /^0[1-9]|1[0-2]$/,
                                                message: "invalid month"
                                            }
                                        }
                                    )
                                    }
                                />

                                <p style={{ marginTop: '10px' }}> / </p>

                                <input
                                    type='text'
                                    name='year'
                                    placeholder='ГГ'
                                    {
                                    ...register(
                                        'year',
                                        {
                                            required: 'Заполните это поле',
                                            pattern: {
                                                value: /^[2-9][0-9]$/,
                                                message: "invalid year"
                                            }
                                        }
                                    )
                                    }
                                />

                                <input
                                    type='text'
                                    name='CVV'
                                    placeholder='CVV'
                                    {
                                    ...register(
                                        'CVV',
                                        {
                                            required: 'Заполните это поле',
                                            pattern: {
                                                value: /^\d{3}$/,
                                                message: "invalid CVV"
                                            }
                                        }
                                    )
                                    }
                                />

                            </div>

                            <hr />

                        </div>
                        : null
                }

                <Button label='Подтвердить оплату' isDisabled={isFinished} onClick={onSubmit} />

            </form>

        </div>
    )

}

export default Payment