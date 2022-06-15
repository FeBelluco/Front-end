import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from "../listaPostagem/ListaPostagem";
import './TabPostagem.css';


function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
        setValue(newValue);
    }
    return (
        <>
            <TabContext value={value}>
                <AppBar position="static" className='appbar'>
                    <Tabs centered indicatorColor="secondary" onChange={handleChange}>
                        <Tab label="Todas as postagens" value="1" />
                        <Tab label="Sobre-nós" value="2" />
                    </Tabs>
                </AppBar>
                <TabPanel value="1" >
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        <ListaPostagem />
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">Sobre-nós</Typography>
                    <Typography variant="body1" gutterBottom color="textPrimary" align="justify"> Uma rede social, voltada para as questões ambientais, que inicialmente foi pensada para Capital e algumas regiões próximas da Grande SP.
                        Nesta rede social, o usuário poderá compartilhar conteúdos, como: indicações de serviços que possam ajudar, pedidos de ajuda, denúncias.</Typography>
                </TabPanel>
            </TabContext>
        </>
    );
}
export default TabPostagem;