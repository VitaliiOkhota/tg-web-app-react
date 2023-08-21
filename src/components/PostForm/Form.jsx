import React, {useCallback, useEffect, useState} from 'react'
import './Form.css'
import {useTelegram} from '../../hooks/useTelegram'

const PostForm = () => {
    const [date1, setDate1] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [seats, setSeats] = useState('1')
    const [info, setInfo] = useState('')
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data ={
            date,
            country,
            city,
            seats,
            info
        }
        tg.sendData(JSON.stringify(data))
    }, [date, country, city, seats, info])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Відправити дані'
        })
    }, [])

    useEffect(() => {
        if (!country || !city || !date || !seats || !info) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, city])

    const onChangeDate1 = (e) => {
        setDate1(e.target.value)
    }

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeSeats = (e) => {
        setSeats(e.target.value)
    }
    const onChangeInfo = (e) => {
        setInfo(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Ввведіть ваші дані</h3>
            <input
                className={'input'}
                type="date"
                placeholder={'Дата відправки'}
                value={date}
                onChange={onChangeDate1}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Пункт відправлення'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Пункт доставки'}
                value={city}
                onChange={onChangeCity}
            />
            <input
                className={'input'}
                type="number"
                placeholder={'Кількість сумок або одиниць багажу'}
                value={seats}
                onChange={onChangeSeats}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Опис посилки'}
                value={info}
                onChange={onChangeInfo}
            />
        </div>
    )
}

export default PostForm