import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaTema.css';
import Tema from '../../../models/Tema';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/token/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {
    const [tema, setTema] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let history = useNavigate();

    useEffect(() => {
        if (token == "") {
            toast.error("Você precisa está logado", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
            history("/login")
        }
    }, [token])

    async function getTema() {
        await busca("/tema", setTema, {
            headers: {
                "Authorization": token
            }  
        })
    }

    useEffect(() => {
        getTema()
    }, [tema.length])

    return (
        <>
            {
                tema.map(tema => (
                    <Box m={2} >
                        <Card variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Tema
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {tema.topico}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {tema.descricao}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display="flex" justifyContent="center" mb={1.5} >

                                    <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                                atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" size='small' color="secondary">
                                                deletar
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))
            }
        </>
    );
}


export default ListaTema;