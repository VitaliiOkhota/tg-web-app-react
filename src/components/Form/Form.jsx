import React, {useCallback, useEffect, useState} from 'react'
import './Form.css'
import {useTelegram} from '../../hooks/useTelegram'

const Form = () => {
    const [date, setDate] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [subject, setSubject] = useState('physical')
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data ={
            country,
            city,
            subject
        }
        tg.sendData(JSON.stringify(data))
    }, [country, city, subject])

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
        setCountry(e.target.value)
    }

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
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
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'legal'}>Юридична особа</option>
                <option value={'physical'}>Фізична особа</option>
            </select>
        </div>
    )
}

export default Form