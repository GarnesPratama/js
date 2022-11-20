import { useEffect, useState } from "react";
import {
  Card,
  HStack,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Badge,
  Button,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [searchParams,setsearchParams] = useSearchParams()
  const [page,setpage] = useState(1)
  const [tes,settes] = useState("")
  const moveTo = (direction) => {

    if(direction === "prev"){

      setsearchParams({
        page: page-1
      })
      setpage(page-1)

    }
    if(direction == "next"){
                    setsearchParams({
                      page: page + 1,
                    });
                    setpage(page + 1);
    }
  }
    useEffect(() => {
      const page = parseInt(searchParams.get("page") || 1);
      setpage(page);
    }, [searchParams]);

       return (
         <HStack>
           {/* TODO: render Prev and Next button */}
             <Button disabled = {page==1} onClick={() => moveTo("prev")}>Prev</Button>


           <Button onClick={() => moveTo("next")}>Next </Button>
           {/* TODO: answer here */}
         </HStack>
       );
  }
    



const PokemonList = ({pokemons}) => {
  return (
    pokemons &&
    pokemons.length > 0 && (
      <Box role="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <Link to={`/pokemon/${index + 1}`}>
            <Card key={pokemon.id}>
              <CardHeader>
                <Heading as="h3" size="md">
                  {pokemon.name}
                </Heading>
              </CardHeader>

              <HStack>
                <Image
                  src={pokemon.sprites.front_default}
                  alt="Front Default"
                />
                <Image src={pokemon.sprites.back_default} alt="Back Default" />
                <Image src={pokemon.sprites.front_shiny} alt="Front Shiny" />
                <Image src={pokemon.sprites.back_shiny} alt="Back Shiny" />
              </HStack>
              <HStack>
                {pokemon.types.map((type) => {
                  return <Button>{type.type.name}</Button>;
                })}
              </HStack>

              {/* TODO: render pokemon images & type here */}
              {/* TODO: answer here */}
            </Card>
          </Link>
          //console.log(pokemon),
        ))}
      </Box>
    )
  );
};
const Home = () => {
  //get list
  const fetchPokemons = async (page) => {
    //get pokemon list with image
    const displayPerPage = 20;
    const offset = (page - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${displayPerPage}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();
    const pokemonList = data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
          console.log(pokemonData);   
      return pokemonData;

    });
         
    //set pokemonList to state
    setPokemons(await Promise.all(pokemonList));
  };

  const [pokemons, setPokemons] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || 1);
    fetchPokemons(page);
  }, [searchParams]);

  return (
    <>
      <Heading as="h2" size="lg">
        Pokemon List
      </Heading>
      <Pagination />
      <PokemonList pokemons={pokemons} />
    </>
  );
};

export default Home;
