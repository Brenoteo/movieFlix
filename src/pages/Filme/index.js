import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css'
// Importa API
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: '82e9ff75d797f91e96237834a65c9d12',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log('Filme não encontrado')
                navigate('/', { replace: true });
                return;
            })
        }

        loadFilme();


        return () => {
            console.log('componente foi desmontado')
        }
    }, [navigate, id]);


    // Função para salvar filmes por clique
    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');
        // Converte o filme para uma lista, mas se não tiver  - inicializa como array vazia.
        let filmesSalvos = JSON.parse(minhaLista) || [];
        // Impede que o filme salvo seja duplicado no localStorage
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme) {
            toast.warn(`${filme.title} - já foi salvo.`)
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success(`${filme.title} - Salvo com sucesso!`)

    }

    if(loading) {
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    
    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;