import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Formulario({ onAdd, onEdit, editingTask }) {
    const [formData, setFormData] = useState({
        categoria: 'casa',
        descricao: '',
        hora: '',
        data: '',
        prioridade: 'selecione'
    });

    useEffect(() => {
        if (editingTask) {
            setFormData({
                categoria: editingTask.categoria,
                descricao: editingTask.descricao,
                hora: editingTask.hora,
                data: editingTask.data,
                prioridade: editingTask.prioridade
            });
        } else {
            setFormData({
                categoria: '',
                descricao: '',
                hora: '',
                data: '',
                prioridade: 'selecione'
            });
        }
    }, [editingTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !formData.descricao.trim() ||
            !formData.data ||
            !formData.hora ||
            formData.prioridade === 'selecione' ||
            formData.categoria === ''
        ) {
            alert('Preencha todos os campos!');
            return;
        }

        if (editingTask) {
            onEdit({ ...formData, id: editingTask.id, concluida: editingTask.concluida });
        } else {
            onAdd(formData);
            // ✅ Limpar o formulário após adicionar
            setFormData({
                categoria: '',
                descricao: '',
                hora: '',
                data: '',
                prioridade: 'selecione'
            });
        }
    };

    const handleCancel = () => {
        if (editingTask) {
            onEdit(null);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
                {editingTask ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="" disabled>
                            Selecione uma categoria
                        </option>
                        <option value="casa">🏠 Casa</option>
                        <option value="trabalho">💼 Trabalho</option>
                        <option value="escola">🏫 Escola</option>
                        <option value="faculdade">🎓 Faculdade</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <input
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        type="text"
                        placeholder="O que precisa ser feito?"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                    <input
                        name="hora"
                        value={formData.hora}
                        onChange={handleChange}
                        type="time"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                    <input
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        type="date"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                    <select
                        name="prioridade"
                        value={formData.prioridade}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="selecione">Selecione</option>
                        <option value="baixa">🟢 Baixa</option>
                        <option value="media">🟡 Média</option>
                        <option value="alta">🔴 Alta</option>
                    </select>
                </div>

                <div className="md:col-span-2 flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                    >
                        {editingTask ? 'Salvar Alterações' : 'Adicionar Tarefa'}
                    </button>

                    {editingTask && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </motion.div>
    );
}