# Quer Apostar Quanto? .

## 1. Seção Inicial

O projeto "Quer Apostar Quanto?" faz parte do desafio proposto pela Driven Education. Neste desafio, implementei o back-end de um sistema de apostas de uma casa de apostas que deseja automatizar os seus processos para competir com esses aplicativos.

[Link para a demo deployada](https://apostarbackend.onrender.com/)

## 2. Sobre

O fluxo simplificado deste projeto consiste em uma série de eventos esportivos que aparecem para o usuário. O usuário faz uma aposta dentro de um evento esportivo (por exemplo, em quem será o vencedor entre uma partida de futebol do Flamengo contra o Botafogo). O evento esportivo acontece e, caso o usuário tenha acertado, recebe um valor.

**Entidades Principais:**

**Participant:**
```typescript
{
	id: number; // id do participante, ex: 1
	createdAt: string; // data e hora da criação do participante, ex: "2023-09-27T19:22:50.503Z"
	updatedAt: string; // mesmo acima para data da última atualização
	name: string; // nome do participante, ex: "João"
	balance: number; // saldo atual do participante, representado em centavos, ex: 1000 (R$ 10,00)
}
```

**Game:**
```typescript
{
	id: number; // id do jogo
	createdAt: string;
	updatedAt: string;
	homeTeamName: string; // nome do time da casa, ex: "Flamengo"
	awayTeamName: string; // nome do time visitante, ex: "Fluminense"
	homeTeamScore: number; // gols do time da casa, ex: 3
	awayTeamScore: number; // gols do time visitante, ex: 1
	isFinished: boolean; // true se o jogo já tiver sido encerrado, false caso contrário
}
```

**Bet:**
```typescript
{
	id: number; // id da aposta
	createdAt: string;
	updatedAt: string;
	homeTeamScore: number; // número de gols do time da casa apostado, ex: 2
	awayTeamScore: number; // número de gols do time visitante apostado, ex: 3
	amountBet: number; // valor apostado, representado em centavos, ex: 1000 (R$ 10,00)
	gameId: number; // id do jogo em que foi feita a aposta
	participantId: number; // id do participante que fez a aposta
	status: string; // estado atual da aposta, podendo ser PENDING (jogo ainda não encerrado), WON (acertou o placar final do jogo) ou LOST (errou o placar final do jogo)
	amountWon: number || null; // valor total ganho na aposta ou nulo enquanto a aposta ainda está PENDING
}
```

## 3. Tecnologias

As principais tecnologias utilizadas neste projeto foram:
- TypeScript
- Node + Express
- Prisma (ORM)
- Postgres
- Jest e Supertest

## 4. Como Rodar

Para rodar o projeto localmente, siga os seguintes passos:

1. Execute `npm i` para instalar as dependências.
2. Crie as variáveis de ambiente: .env (produção), .env.development (desenvolvimento) e .env.test (teste)
3. Coloque em cada um delas o seguinte comando:

.env: `DATABASE_URL = "postgres://apostar_1iib_user:SdbspystZtVThePSO7LyX5pCVyTVyH7x@dpg-cl5u9id6fh7c73cttar0-a.oregon-postgres.render.com/apostar_1iib"`

.env.development: `DATABASE_URL=postgres://postgres:SENHA@localhost:5432/NOME-DO-BANCO`

.env.test: `DATABASE_URL=postgres://postgres:SENHA@localhost:5432/NOME-DO-BANCO-TEST`

4. Rodar dev:migration:run
5. Rodar test:migration:run
6. npx prisma migrate dev 
1. npm run dev