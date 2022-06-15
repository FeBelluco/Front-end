import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca, put } from '../../../services/Service'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaPostagem.css';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/token/tokensReducer';
import {toast} from "react-toastify"
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

function ListaPostagem() {
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        midia: '',
        data: '',
        regioes: '' , 
        curtir: 0,
        tema: null
    })
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
);

  let history = useNavigate();
  

  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: "undefined"
      })     
        history("/login")

    }
  }, [token])

  async function curtidas(id: number) {
    await put(`/postagem/curtir/${id}`, postagem, setPostagem, {
      headers: {
        'Authorization': token
      }
    }
    );
    getPostagem()
  }

  async function getPostagem() {
    await busca("/postagem", setPostagens, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPostagem()

  }, [postagens.length])

  return (
    <>
      {
        postagens.map(postagem => (
          <Box m={2} >
            <Card variant="outlined" className="postagem">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Postagens:
                </Typography>
                <Typography variant="h5" component="h2">
                  {postagem.titulo}
                </Typography>
                <Typography variant="body2" component="p">
                  {postagem.texto}
                </Typography>
                <Typography variant="body2" component="p">
                  <img className='img-postagem' src={postagem.midia}/>
                </Typography>
                <Typography variant="body2" component="p">
                  {postagem.regioes}
                </Typography>
                Tema:
                <Typography variant="body2" component="p">
                  {postagem.tema?.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioPostagem/${postagem.id}`} className="text-decorator-none" >
                    <Box mx={1} className='bntListPost' >
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarPostagem/${postagem.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary">
                        deletar
                      </Button>
                    </Box>
                  </Link>
                  <Box mx={1}>
                      <Button onClick={() => { curtidas(postagem.id) }} ><ThumbUpIcon color='primary'></ThumbUpIcon></Button>
                      <Typography style={{ color: 'black' }} align='center' variant="body2" component="p"> {postagem.curtir}</Typography>
                    </Box>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      }
    </>
  )
}

export default ListaPostagem;

