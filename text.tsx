/*
=====================================================
🧩 EXERCÍCIO PRÁTICO: GERENCIADOR DE METAS DE ESTUDO
=====================================================

🎯 OBJETIVO
Criar uma aplicação React + TypeScript para gerenciar
metas de estudo, utilizando os principais conceitos
básicos e intermediários do React.

-----------------------------------------------------
📌 CONCEITOS OBRIGATÓRIOS
-----------------------------------------------------
✔ useState
✔ Props tipadas com TypeScript
✔ Renderização de listas com .map
✔ Formulários controlados (value + onChange)
✔ Adição de itens com spread operator (...)
✔ Remoção de itens com .filter

-----------------------------------------------------
📦 ESTRUTURA SUGERIDA
-----------------------------------------------------
src/
 ├─ components/
 │   ├─ MetaForm.tsx
 │   ├─ MetaItem.tsx
 │   └─ MetaList.tsx
 └─ App.tsx

-----------------------------------------------------
🧠 MODELAGEM DE DADOS
-----------------------------------------------------
Uma Meta deve possuir a seguinte estrutura:

{
  id: number
  titulo: string
  horas: number
  concluida: boolean
}

-----------------------------------------------------
📝 FUNCIONALIDADES
-----------------------------------------------------

1️⃣ FORMULÁRIO DE CADASTRO (MetaForm)
- Input de texto: título da meta
- Input numérico: horas planejadas
- Botão: "Adicionar Meta"
- Inputs devem ser controlados (value e onChange)
- Após adicionar, limpar os campos

2️⃣ ADICIONAR META
- Usar spread operator para adicionar na lista
- Meta deve iniciar com concluida = false

3️⃣ LISTAR METAS (MetaList)
- Renderizar metas usando .map
- Exibir:
  - Título
  - Horas
  - Status: "Concluída" ou "Pendente"

4️⃣ CONCLUIR META
- Cada meta deve ter um botão "Concluir"
- Ao clicar:
  - Alterar concluida para true
  - Alterar visualmente (texto riscado ou cor)

5️⃣ REMOVER META
- Cada meta deve ter um botão "Remover"
- Remover usando .filter

-----------------------------------------------------
📡 PROPS ENTRE COMPONENTES
-----------------------------------------------------

MetaForm:
- Recebe função para adicionar meta

MetaList:
- Recebe lista de metas
- Recebe funções de remover e concluir

MetaItem:
- Recebe:
  - meta
  - função de remover
  - função de concluir

-----------------------------------------------------
🧪 DESAFIOS EXTRAS (OPCIONAL)
-----------------------------------------------------
⭐ Mostrar total de horas planejadas
⭐ Mostrar total de metas concluídas
⭐ Desabilitar botão "Concluir" se já estiver concluída
⭐ Tipar corretamente eventos:
  React.ChangeEvent<HTMLInputElement>

-----------------------------------------------------
✅ OBJETIVO FINAL
-----------------------------------------------------
Praticar React + TypeScript de forma integrada,
simulando um mini sistema real.
=====================================================
*/
