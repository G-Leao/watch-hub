import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../services/hooks/useAppState.jsx";
import WatchForm from "../../components/WatchForm/WatchForm";
import Modal from "../../components/Modal/Modal";
import { useParams } from "react-router-dom";

export default function Cadastro() {
  const { watches, actions, helpers } = useContext(AppContext);

  // Para simplificar: cadastro sem rota de edição.
  // Edição via modal pode ser acionada por página de detalhes (quando implementarmos).
  const [editing, setEditing] = useState(null);
  const existingReferences = useMemo(
    () => watches.map((w) => String(w.reference).trim()),
    [watches],
  );

  useEffect(() => {
    setEditing(null);
  }, []);

  function handleSubmit(values) {
    if (editing?.id) {
      actions.updateWatch(editing.id, { ...values, updatedAt: Date.now() });
      setEditing(null);
      return;
    }

    actions.addWatch({
      ...values,
      id: String(Date.now()),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  return (
    <section className="page">
      <h1 className="pageTitle">Cadastro</h1>

      <WatchForm
        initialValues={
          editing || {
            brand: "",
            model: "",
            reference: "",
            year: "",
            diameter: "",
            material: "",
            movement: "",
            dialColor: "",
            waterResistance: "",
            price: "",
            imageUrl: "",
            description: "",
          }
        }
        existingReferences={existingReferences}
        onSubmit={handleSubmit}
      />

      {/* Placeholder modal para compatibilidade futura */}
      <Modal open={false} title="Editar" onClose={() => setEditing(null)}>
        —
      </Modal>
    </section>
  );
}
