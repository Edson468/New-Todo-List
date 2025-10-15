// src/App.js
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
//import { motion } from 'framer-motion';
import Formulario from './components/Formulario';
import CaixaStatus from './components/CaixaStatus';
import ResumoTarefas from './components/ResumoTarefas';

// Função para verificar se tarefa está atrasada
const isAtrasada = (tarefa) => {
  if (tarefa.concluida) return false;
  const agora = new Date();
  const dataTarefa = new Date(`${tarefa.data}T${tarefa.hora}`);
  return dataTarefa < agora;
};

// Função para ordenar tarefas: alta > média > baixa, depois por data
const ordenarTarefas = (tarefas) => {
  const prioridadeOrdem = { alta: 3, media: 2, baixa: 1 };
  return [...tarefas].sort((a, b) => {
    if (prioridadeOrdem[b.prioridade] !== prioridadeOrdem[a.prioridade]) {
      return prioridadeOrdem[b.prioridade] - prioridadeOrdem[a.prioridade];
    }
    return new Date(`${a.data}T${a.hora}`) - new Date(`${b.data}T${b.hora}`);
  });
};

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const saved = localStorage.getItem('tarefas');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const location = useLocation();
  const categoriaAtiva = location.pathname === '/' ? null : location.pathname.substring(1);
  const tarefasFiltradas = categoriaAtiva
    ? tarefas.filter(t => t.categoria === categoriaAtiva)
    : tarefas;

  const concluidas = tarefasFiltradas.filter(t => t.concluida);
  const pendentesNaoAtrasadas = tarefasFiltradas.filter(t => !t.concluida && !isAtrasada(t));
  const atrasadas = tarefasFiltradas.filter(t => isAtrasada(t));

  const concluidasOrdenadas = ordenarTarefas(concluidas);
  const pendentesOrdenadas = ordenarTarefas(pendentesNaoAtrasadas);
  const atrasadasOrdenadas = ordenarTarefas(atrasadas);

  // Ações
  const adicionarTarefa = (novaTarefa) => {
    setTarefas([...tarefas, { ...novaTarefa, id: Date.now(), concluida: false }]);
  };

  const editarTarefa = (tarefaAtualizada) => {
    if (!tarefaAtualizada) {
      setEditingTask(null);
      return;
    }
    setTarefas(tarefas.map(t => t.id === tarefaAtualizada.id ? tarefaAtualizada : t));
    setEditingTask(null);
  };

  const toggleConcluida = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  };

  const excluir = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  const limparTodas = () => {
    if (window.confirm('Tem certeza que deseja apagar todas as tarefas? Esta ação não pode ser desfeita.')) {
      setTarefas([]);
    }
  };

  const exportarParaCSV = () => {
    const tarefasParaExportar = categoriaAtiva
      ? tarefas.filter(t => t.categoria === categoriaAtiva)
      : tarefas;

    if (tarefasParaExportar.length === 0) {
      alert('Nenhuma tarefa para exportar.');
      return;
    }

    const cabecalho = ['ID', 'Categoria', 'Descrição', 'Data', 'Hora', 'Prioridade', 'Concluída'];
    const linhas = tarefasParaExportar.map(t => [
      t.id,
      t.categoria,
      `"${t.descricao.replace(/"/g, '""')}"`,
      t.data,
      t.hora,
      t.prioridade,
      t.concluida ? 'Sim' : 'Não'
    ]);

    const csvContent = [
      cabecalho.join(','),
      ...linhas.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tarefas_${categoriaAtiva || 'todas'}_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              📝 Lista de Tarefas
            </h1>
            <nav>
              <ul className="flex flex-wrap justify-center gap-3">
                {['/', '/casa', '/trabalho', '/escola', '/faculdade'].map(path => {
                  const nome = path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2);
                  const icone = path === '/' ? '🌐' :
                    path === '/casa' ? '🏠' :
                      path === '/trabalho' ? '💼' :
                        path === '/escola' ? '🏫' : '🎓';
                  return (
                    <li key={path}>
                      <Link
                        to={path}
                        className={`px-3 py-1.5 rounded-lg font-medium transition ${location.pathname === path
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {icone} {nome}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Botões de ação */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={exportarParaCSV}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-1 transition shadow hover:shadow-md"
          >
            📤 Exportar CSV
          </button>
          <button
            onClick={limparTodas}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium flex items-center gap-1 transition shadow hover:shadow-md"
          >
            🗑️ Limpar Tudo
          </button>
        </div>

        {/* ✅ Layout em duas colunas: Formulário + Resumo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Coluna Esquerda: Formulário (2/3) */}
          <div className="lg:col-span-2">
            <Formulario
              onAdd={adicionarTarefa}
              onEdit={editarTarefa}
              editingTask={editingTask}
            />
          </div>

          {/* Coluna Direita: Resumo (1/3) */}
          <div className="lg:col-span-1">
            <ResumoTarefas tarefas={tarefasFiltradas} />
          </div>
        </div>

        {/* ✅ Cards de status — SEMPRE VISÍVEIS */}
        {/* Cards de status — na ordem desejada */}
        <div className="space-y-8">
          {/* 1. Tarefas Pendentes */}
          <CaixaStatus
            titulo="⏳ Tarefas Pendentes"
            tarefas={pendentesOrdenadas}
            onToggle={toggleConcluida}
            onExcluir={excluir}
            onEditar={setEditingTask}
            cor="bg-blue-50 border-blue-200"
            sempreVisivel={true}
          />

          {/* 2. Tarefas Atrasadas */}
          <CaixaStatus
            titulo="⚠️ Tarefas Atrasadas"
            tarefas={atrasadasOrdenadas}
            onToggle={toggleConcluida}
            onExcluir={excluir}
            onEditar={setEditingTask}
            cor="bg-red-50 border-red-200"
            sempreVisivel={true}
          />

          {/* 3. Tarefas Concluídas */}
          <CaixaStatus
            titulo="✅ Tarefas Concluídas"
            tarefas={concluidasOrdenadas}
            onToggle={toggleConcluida}
            onExcluir={excluir}
            onEditar={setEditingTask}
            cor="bg-green-50 border-green-200"
            sempreVisivel={true}
          />
        </div>
      </main>
    </div>
  );
}

export default App;