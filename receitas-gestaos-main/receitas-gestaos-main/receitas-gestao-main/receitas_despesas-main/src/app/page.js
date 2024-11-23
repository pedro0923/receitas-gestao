"use client";  // Diretriz para informar que este é um componente do lado do cliente

import React, { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [records, setRecords] = useState([]); // Para armazenar os registros
  const [editIndex, setEditIndex] = useState(null); // Para saber qual item editar

  // Estado para armazenar os dados do formulário de adicionar/editar
  const [type, setType] = useState(""); // Entrada ou Saída
  const [categories, setCategories] = useState([]); // Categorias selecionadas
  const [newCategory, setNewCategory] = useState(""); // Nova categoria personalizada
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const categoryOptions = [
    "salario", "investimentos", "aluguel", "contas", "transporte", "saude", "educacao", "lazer"
  ];

  const handleAddClick = () => {
    setIsAddOpen(true);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
    setIsAddOpen(false);
    setIsDeleteOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
    setIsAddOpen(false);
    setIsEditOpen(false);
  };

  // Função para adicionar um novo registro
  const handleAddRecord = () => {
    let finalCategories = [...categories];

    // Se a categoria "Nova Categoria" foi marcada e o nome foi inserido, adicionar a categoria personalizada ao array
    if (newCategory && !categoryOptions.includes(newCategory) && !finalCategories.includes(newCategory)) {
      finalCategories.push(newCategory);
    }

    // Criar o novo registro
    const newRecord = { type, categories: finalCategories, description, value, date };

    // Adicionar o novo registro aos registros existentes
    setRecords([...records, newRecord]);

    // Limpar os campos após adicionar
    setType("");
    setCategories([]);
    setNewCategory(""); // Limpar o campo de nova categoria após adicionar
    setDescription("");
    setValue("");
    setDate("");
    setIsAddOpen(false); // Fechar a aba de adicionar
  };

  // Função para carregar os dados de um registro para edição
  const handleEditRecordClick = (index) => {
    setEditIndex(index);
    setType(records[index].type);
    setCategories(records[index].categories);
    setDescription(records[index].description);
    setValue(records[index].value);
    setDate(records[index].date);
    setIsEditOpen(true); // Abrir a aba de edição
  };

  // Função para salvar as alterações de um registro
  const handleSaveEdit = () => {
    const updatedRecords = [...records];
    updatedRecords[editIndex] = { type, categories, description, value, date };
    setRecords(updatedRecords);

    // Limpar os campos após editar
    setType("");
    setCategories([]);
    setNewCategory("");
    setDescription("");
    setValue("");
    setDate("");
    setIsEditOpen(false); // Fechar a aba de editar
    setEditIndex(null); // Resetar o índice de edição
  };

  // Função para excluir um registro
  const handleDeleteRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    setIsDeleteOpen(false); // Fechar a aba de excluir
  };

  const handleCategoryChange = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  // Função para adicionar nova categoria
  const handleAddNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory(""); // Limpar o campo de nova categoria após adicionar
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.titulos}>
        <h1 id="titulo_principal">Receitas e Despesas</h1>
        <h2 id="subtitulo">Set. 2024</h2>
      </div>

      <h2>Entradas e Saídas</h2>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleAddClick}>
          Adicionar
        </button>
        <button className={styles.button} onClick={handleEditClick}>
          Editar
        </button>
        <button className={styles.button} onClick={handleDeleteClick}>
          Excluir
        </button>
      </div>

      {/* Mini abas */}
      {isAddOpen && (
        <div className={styles.modal}>
          <h3>Nova Receita/Despesa</h3>
          <div>
            <label>Tipo:</label>
            <input
              type="radio"
              name="type"
              value="entrada"
              checked={type === "entrada"}
              onChange={() => setType("entrada")}
            /> Entrada
            <input
              type="radio"
              name="type"
              value="saida"
              checked={type === "saida"}
              onChange={() => setType("saida")}
            /> Saída
          </div>

          {/* Valor e Data acima das categorias */}
          <div>
            <label>Valor:</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <label>Data:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label>Categorias:</label>
            {categoryOptions.map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  id={category}
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              </div>
            ))}
          </div>

          {/* Nova Categoria */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={categories.includes("newCategory")}
                onChange={() => handleCategoryChange("newCategory")}
              />
              Nova Categoria
            </label>
            <input
              type="text"
              placeholder="Adicionar nova categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>

          <div>
            <label>Descrição:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button onClick={handleAddRecord}>Adicionar</button>
        </div>
      )}

      {isEditOpen && (
        <div className={styles.modal}>
          <h3>Editar Receita/Despesa</h3>
          <div>
            <label>Tipo:</label>
            <input
              type="radio"
              name="type"
              value="entrada"
              checked={type === "entrada"}
              onChange={() => setType("entrada")}
            /> Entrada
            <input
              type="radio"
              name="type"
              value="saida"
              checked={type === "saida"}
              onChange={() => setType("saida")}
            /> Saída
          </div>

          {/* Valor e Data acima das categorias */}
          <div>
            <label>Valor:</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <label>Data:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label>Categorias:</label>
            {categoryOptions.map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  id={category}
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              </div>
            ))}
          </div>

          {/* Nova Categoria */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={categories.includes("newCategory")}
                onChange={() => handleCategoryChange("newCategory")}
              />
              Nova Categoria
            </label>
            <input
              type="text"
              placeholder="Adicionar nova categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>

          <div>
            <label>Descrição:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button onClick={handleSaveEdit}>Salvar</button>
        </div>
      )}

      {/* Excluir */}
      {isDeleteOpen && (
        <div className={styles.modal}>
          <h3>Excluir</h3>
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
  <tr key={index}>
    <td>{record.type}</td>
    <td>{record.value}</td>
    <td>{Array.isArray(record.category) ? record.category.join(", ") : ''}</td>
    <td>{record.description}</td>
    <td>{record.date}</td>
    <td>
      {/* Outros elementos ou botões podem ir aqui */}
    </td>
  </tr>
))}
            </tbody>
          </table>
        </div>
      )}

      

{/* Tabela com todos os registros */}
<div className={styles.container}>
  <h3 className={styles.title}>Registros:</h3>
  <table className={styles.table}>
    <thead>
      <tr>
        <th className={styles.tableHeader}>Tipo</th>
        <th className={styles.tableHeader}>Valor</th>
        <th className={styles.tableHeader}>Categoria</th>
        <th className={styles.tableHeader}>Descrição</th>
        <th className={styles.tableHeader}>Data</th>
        <th className={styles.tableHeader}>Ações</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record, index) => (
        <tr key={index} className={styles.tableRow}>
          <td>{record.type}</td>
          <td>{record.value}</td>
          <td>{record.category ? record.category.join(", ") : ""}</td>
          <td>{record.description}</td>
          <td>{record.date}</td>
          <td>
            <button className={styles.editButton} onClick={() => handleEditRecordClick(index)}>Editar</button>
            <button className={styles.deleteButton} onClick={() => handleDeleteRecord(index)}>Excluir</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );

}

