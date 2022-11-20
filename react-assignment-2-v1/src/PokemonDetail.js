import { useEffect, useState } from "react";
import { Badge, Tr, Td, HStack, VStack, Heading, Box, Text, Button } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Table } from "@chakra-ui/react";
import { Tbody } from "@chakra-ui/react";

const Detail = ({ pokemon }) => {
  return (
    <Box>
      {pokemon && (
        <Box key={pokemon.id} role="pokemon-detail">
          {/* TODO: display pokemon name here */}
          {/* TODO: answer here */}
          <Text role="pokemon-detail">{pokemon?.name}</Text>
          <HStack>
            {pokemon.types.map((type) => {
              return <Button>{type?.type.name}</Button>;
            })}

            {/* {pokemon.map((type) => {
              return ;
            })} */}
          </HStack>

          {/* TODO: display pokemon type here */}
          {/* TODO: answer here */}
          <HStack>
            <Image src={pokemon?.sprites.front_default} />
            <Image src={pokemon?.sprites.back_default} />
            <Image src={pokemon?.sprites.front_shiny} />
            <Image src={pokemon?.sprites.back_shiny} />
          </HStack>

          <Text>Height</Text>
          <Text>{pokemon?.height}</Text>

          <Text>Weight</Text>
          <Text>{pokemon?.weight}</Text>

          <Text>Base Experience</Text>
          <Text>{pokemon?.base_experience}</Text>

          <HStack>
            <Text>Abilities</Text>
            {pokemon.abilities.map((item) => {
              return <Text>{item?.ability.name}</Text>;
            })}
          </HStack>

          <HStack>
            <Text>Stats</Text>
            <Text> hp: {pokemon?.stats[0]?.base_stat}</Text>
            <Text> attack: {pokemon?.stats[1]?.base_stat}</Text>
            <Text> defense: {pokemon?.stats[2]?.base_stat}</Text>
            <Text> spesial-attack: {pokemon?.stats[3]?.base_stat}</Text>
            <Text> spesial-defense: {pokemon?.stats[4]?.base_stat}</Text>
            <Text> speed: {pokemon?.stats[5]?.base_stat}</Text>
          </HStack>
          {/* TODO: render pokemon height, weight, base_experience, abilities, and stats here */}
          {/* TODO: answer here */}
        </Box>
      )}
    </Box>
  );
};
const Page = () => {
  //TODO: read pokemonId from parameter
  const { pokemonId } = useParams(); /// TODO: replace this
  const [pokemon, setPokemon] = useState(null);
  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    setPokemon(data);
  };
  useEffect(() => {
    fetchPokemon(pokemonId)
  }, [pokemonId]);

  return <Detail pokemon={pokemon}    />;
};

export default Page;
