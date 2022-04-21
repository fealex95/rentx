# RentX - Rocketseat Ignite

A aplicação foi desenvolvida em um curso da Rocketseat

A idéia da criação do aplicativo foi para uma locadora de carros. Desenvolvendo componentes para mostrar destalhes do carro.

Pontos aprendidos com projeto:

- Consumir API com Axios
- Utilizar React Native Animated
- Criação de calendarios com função de periodo
- Lidar com gestos do usuário
- Utilizada algumas animações com Lottie
- Uso do Stack Navigation

## Tecnologias Utilizadas

React Native, Expo, Typescript, React Animated, Json-Server

## Como usar o aplicativo
Clone o repositório e entre na pasta onde foi clonado, execute o seguinte comandos

```bash
  yarn install
```
ou
```bash
  npm install
```
Instale o Json-Server com comando
```bash
  npm install -g json-server
```
Altere o arquivo package.json
```bash
    "scripts": {
        "api": "json-server ./src/services/server.json --host x.x.x.x --port 3333 --delay 700"
    }
```
onde x.x.x.x é o endereço IP do seu computador

Altere o arquivo ./src/services/api
```bash
const api = axios.create({
    baseURL: 'http://x.x.x.x:3333/',
});
```
Mantendo x.x.x.x como o endereço IP

Execute o comando
```bash
    yarn api
```

Abra outro terminal e execute o comando
```bash
    expo start
```


## Screenshots

<div style="flex-direction: row;">
Em desenvolvimento ainda...
</div>
