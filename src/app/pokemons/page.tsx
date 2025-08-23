import Link from 'next/link';
import { z } from 'zod';

import { Main } from '#/components/common/main/Main';
import { Logo } from '#/components/common/navbar/Logo';
import { Navbar } from '#/components/common/navbar/Navbar';
import { PokemonsFrame } from '#/frames/PokemonsFrame';
import { nanoid } from 'nanoid';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table';
import { PokemonFrame } from '#/frames/PokemonFrame';
import { Paging } from '#/components/common/pagination/Paging';

const PageSchema = z.preprocess(
  (v) => v ?? '1', // null/undefined면 "0"
  z.coerce.number().int().nonnegative(), // 문자열을 정수로 강제 변환
);

const SizeSchema = z.preprocess(
  (v) => v ?? '5', // null/undefined면 "0"
  z.coerce.number().int().nonnegative(), // 문자열을 정수로 강제 변환
);

const Pokemons: React.FC<{
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}> = async ({ searchParams }) => {
  const params = await searchParams;
  const page = PageSchema.parse(params.page);
  const size = SizeSchema.parse(params.size);

  const frame = PokemonsFrame.of((b) =>
    b.from({ limit: size, offset: (page - 1) * size }),
  );
  const reply = await frame.execute();

  const replies = await Promise.all(
    reply.data.results
      .map((pokemon) => PokemonFrame.of((b) => b.from({ name: pokemon.name })))
      .map((frame) => frame.execute()),
  );

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <Navbar>
        <Logo />

        <Link href="/">Home</Link>
        <Link href="/pokemons">Pokemon</Link>
      </Navbar>

      <Main>
        <div className="flex p-3 h-full w-full">
          <div className="flex flex-col">
            <div className="flex w-full">
              <h1>Pokemons</h1>
            </div>

            <div className="flex w-full">
              <Table>
                <TableCaption>Pokemon list table</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Picture</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Weight / Height</TableHead>
                    <TableHead>Ability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {replies.map((pokemon) => (
                    <TableRow key={nanoid()}>
                      <TableCell>{pokemon.data.id}</TableCell>
                      <TableCell className="pl-5 pr-5">
                        <img
                          width="80rem"
                          src={`https://img.pokemondb.net/artwork/large/${pokemon.data.name}.jpg`}
                        />
                      </TableCell>
                      <TableCell className="pl-5 pr-5">
                        {pokemon.data.name}
                      </TableCell>
                      <TableCell className="pl-5 pr-5">
                        <ul className="m-auto list-disc">
                          {pokemon.data.types.map((pokeType) => (
                            <li key={nanoid()}>{pokeType.type.name}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className="pl-5 pr-5">
                        {pokemon.data.weight} / {pokemon.data.height}
                      </TableCell>
                      <TableCell className="pl-5 pr-5">
                        <ul className="m-auto list-disc">
                          {pokemon.data.abilities.map((ability) => (
                            <li key={nanoid()}>{ability.ability.name}</li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>Page</TableCell>
                    <TableCell className="text-right">
                      <strong>{page}</strong> / {size}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <div className="flex w-full mt-5">
              <Paging page={page} size={5} url="/pokemons" />
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Pokemons;
