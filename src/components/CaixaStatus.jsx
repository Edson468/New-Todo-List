// src/components/CaixaStatus.jsx
import { motion } from 'framer-motion';

const getPrioridadeIcon = (prioridade) => {
    switch (prioridade) {
        case 'alta': return '🔴';
        case 'media': return '🟡';
        case 'baixa': return '🟢';
        default: return '⚪';
    }
};

export default function CaixaStatus({ titulo, tarefas, onToggle, onExcluir, onEditar, cor, sempreVisivel = false }) {
    // Se não for "sempre visível" e não tiver tarefas, não renderiza
    if (!sempreVisivel && tarefas.length === 0) {
        return null;
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border ${cor} p-5`}
        >
            <h3 className="text-xl font-bold text-gray-800 mb-4">{titulo}</h3>

            {tarefas.length > 0 ? (
                <ul className="space-y-3">
                    {tarefas.map(t => (
                        <motion.li
                            layout
                            key={t.id}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
                        >
                            <div className="flex justify-between">
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{t.descricao}</p>
                                    <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                                        <span className="bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full text-xs font-medium capitalize">
                                            {t.categoria}
                                        </span>
                                        <span>{t.data} às {t.hora}</span>
                                        <span className="flex items-center gap-1">
                                            {getPrioridadeIcon(t.prioridade)} {t.prioridade.charAt(0).toUpperCase() + t.prioridade.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => onEditar(t)}
                                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition"
                                        title="Editar"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => onToggle(t.id)}
                                        className="text-gray-600 hover:text-gray-800 p-1.5 rounded hover:bg-gray-100 transition"
                                        title={t.concluida ? 'Desfazer' : 'Concluir'}
                                    >
                                        {t.concluida ? '↩️' : '✅'}
                                    </button>
                                    <button
                                        onClick={() => onExcluir(t.id)}
                                        className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition"
                                        title="Excluir"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-6 text-gray-500">
                    <p>Nenhuma tarefa neste status.</p>
                </div>
            )}
        </motion.div>
    );
}