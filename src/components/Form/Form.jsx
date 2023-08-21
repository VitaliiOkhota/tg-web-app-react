import React, {useCallback, useEffect, useState} from 'react'
import './Form.css'
import {useTelegram} from '../../hooks/useTelegram'

const Form = () => {
    const [date, setDate] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [seats, setSeats] = useState('1')
    const [info, setInfo] = useState('Введіть додаткову інформацію та побажання до поїздки')
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
        if (!country || !city || !date) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, city])

    const onChangeDate = (e) => {
        setDate(e.target.value)
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
                placeholder={'Дата поїздки'}
                value={date}
                onChange={onChangeDate}
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
                placeholder={'Пункт прибуття'}
                value={city}
                onChange={onChangeCity}
            />
            <input
                className={'input'}
                type="number"
                placeholder={'Кількість пасажирів'}
                value={seats}
                onChange={onChangeSeats}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Додаткова інформація'}
                value={info}
                onChange={onChangeInfo}
            />
        </div>
    )
}

export default Form