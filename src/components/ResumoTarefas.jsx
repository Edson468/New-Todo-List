// src/components/ResumoTarefas.jsx
import { motion } from 'framer-motion';

export default function ResumoTarefas({ tarefas }) {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const pendentes = total - concluidas;

  const alta = tarefas.filter(t => t.prioridade === 'alta').length;
  const media = tarefas.filter(t => t.prioridade === 'media').length;
  const baixa = tarefas.filter(t => t.prioridade === 'baixa').length;

  const categorias = {
    casa: tarefas.filter(t => t.categoria === 'casa').length,
    trabalho: tarefas.filter(t => t.categoria === 'trabalho').length,
    escola: tarefas.filter(t => t.categoria === 'escola').length,
    faculdade: tarefas.filter(t => t.categoria === 'faculdade').length
  };

  const resumoItem = (label, valor, cor = 'bg-gray-100', icone = '') => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="text-center p-4 rounded-xl border"
    >
      <div className={`text-2xl font-bold ${cor} w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2`}>
        {icone}
      </div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{valor}</p>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          📊 Visão Geral das Tarefas
        </h3>

        {/* Linha 1: Total, Concluídas, Pendentes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {resumoItem('Total', total, 'bg-blue-100', '📋')}
          {resumoItem('Concluídas', concluidas, 'bg-green-100', '✅')}
          {resumoItem('Pendentes', pendentes, 'bg-amber-100', '⏳')}
        </div>

        {/* Linha 2: Prioridades */}
        <div className="mb-5">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Prioridades</h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-xl">🔴</span>
              <span className="font-medium">Alta:</span>
              <span className="font-bold">{alta}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xl">🟡</span>
              <span className="font-medium">Média:</span>
              <span className="font-bold">{media}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">🟢</span>
              <span className="font-medium">Baixa:</span>
              <span className="font-bold">{baixa}</span>
            </div>
          </div>
        </div>

        {/* Linha 3: Categorias */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Categorias</h4>
          <div className="flex flex-wrap gap-4">
            {Object.entries(categorias).map(([cat, count]) => {
              const icone = cat === 'casa' ? '🏠' :
                            cat === 'trabalho' ? '💼' :
                            cat === 'escola' ? '🏫' : '🎓';
              return (
                <div key={cat} className="flex items-center gap-1">
                  <span>{icone}</span>
                  <span className="font-medium capitalize">{cat}:</span>
                  <span className="font-bold">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}