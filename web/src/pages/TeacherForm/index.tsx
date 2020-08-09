import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { weekDay: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { weekDay: 0, from: '', to: '' }
        ]);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro!');
        })
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrível que você quer dar aulas."
            description="O primeiro passo é preencher este formulário de inscrição"/>

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>

                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }}/>
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar} 
                            onChange={(e) => { setAvatar(e.target.value) }}/>
                        <Input 
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp} 
                            onChange={(e) => { setWhatsapp(e.target.value) }}/>
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio} 
                            onChange={(e) => { setBio(e.target.value) }}/>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject} 
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'História', label: 'História' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Educação Física', label: 'Educação Física' },
                        ]}/>
                        <Input 
                            name="cost" 
                            label="Custo da sua hora"
                            value={cost} 
                            onChange={(e) => { setCost(e.target.value) }}/>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis 
                            <button type="button" onClick={addNewScheduleItem}>+ Novo Horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return(
                                <div key={scheduleItem.weekDay} className="schedule-item">
                                    <Select 
                                    name="weekDay" 
                                    label="Dia da Semana"
                                    onChange={e => setScheduleItemValue(index, 'weekDay', e.target.value)}
                                    value={scheduleItem.weekDay}
                                    options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-feira' },
                                        { value: '2', label: 'Terça-feira' },
                                        { value: '3', label: 'Quarta-feira' },
                                        { value: '4', label: 'Quinta-feira' },
                                        { value: '5', label: 'Sexta-feira' },
                                        { value: '6', label: 'Sábado' },
                                    ]}/>

                                    <Input 
                                        type="time" 
                                        name="from" 
                                        label="Das"
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        value={scheduleItem.from}
                                    />
                                    <Input 
                                        type="time" 
                                        name="to" 
                                        label="Até"
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        value={scheduleItem.to}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso Importante"/>
                        Importante <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">Salvar Cadastro</button>
                </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;