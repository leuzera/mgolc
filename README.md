# mgol-parser

Esta atividade prática em Compiladores é um componente para a avaliação e desenvolvimento dos conhecimentos envolvidos na disciplina Compiladores para o curso de Ciências da Computação, INF/UFG

## Requerimentos

Para execução do mgolc, `Node V12+` e a ultima versão do `npm` devem estar instalados.

## Instalação

```sh
git clone https://github.com/leuzera/mgolc.git
npm i -g ./mgolc
```

Para desinstalar o mgolc, execute o comando abaixo:

```sh
npm uninstall -g mgolc
```

## Uso

```sh
mgolc [options] file
```

Para mais opções, veja `mgolc --help`

## Fases do projeto

### Scanner

Para mais informações consulte os [requisitos da primeira entrega](docs/Descricao_trabalho1_Compiladores2020.pdf)

## Desenvolvimento

Primeiro, clone o repositório:

```sh
git clone https://github.com/leuzera/mgolc.git
cd mgolc
```

Depois instale as dependências do projeto:

```sh
npm install
```

Então compile

```sh
npm run build
```

E rode com o comando

```sh
./bin/mgolc [options] file
```
