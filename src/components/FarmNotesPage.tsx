import { useState, useEffect } from "react";
import { StickyNote, Plus, Trash2, Pencil, X, Check, Sprout } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { crops } from "@/data/crops";

interface FarmNote {
  id: string;
  text: string;
  cropId: string;
  date: string;
}

const STORAGE_KEY = "smartkisan_notes";

export function FarmNotesPage() {
  const { lang, t } = useLang();
  const [notes, setNotes] = useState<FarmNote[]>([]);
  const [noteText, setNoteText] = useState("");
  const [noteCrop, setNoteCrop] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editCrop, setEditCrop] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setNotes(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  function saveNotes(updated: FarmNote[]) {
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  }

  function handleAddNote() {
    const trimmed = noteText.trim();
    if (!trimmed) return;
    const note: FarmNote = {
      id: crypto.randomUUID(),
      text: trimmed,
      cropId: noteCrop,
      date: new Date().toISOString(),
    };
    saveNotes([note, ...notes]);
    setNoteText("");
    setNoteCrop("");
  }

  function handleDeleteNote(id: string) {
    if (!window.confirm(t("notes.deleteConfirm"))) return;
    saveNotes(notes.filter((n) => n.id !== id));
  }

  function handleStartEdit(note: FarmNote) {
    setEditingId(note.id);
    setEditText(note.text);
    setEditCrop(note.cropId);
  }

  function handleSaveEdit() {
    if (!editingId) return;
    const trimmed = editText.trim();
    if (!trimmed) return;
    saveNotes(
      notes.map((n) =>
        n.id === editingId ? { ...n, text: trimmed, cropId: editCrop } : n
      )
    );
    setEditingId(null);
    setEditText("");
    setEditCrop("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditText("");
    setEditCrop("");
  }

  function formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleDateString(lang === "ur" ? "ur-PK" : lang === "sd" ? "sd-PK" : "en-PK", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return new Date(iso).toLocaleDateString();
    }
  }

  function getCropName(cropId: string): string | null {
    if (!cropId) return null;
    const crop = crops.find((c) => c.id === cropId);
    return crop ? t(crop.nameKey) : null;
  }

  return (
    <div className="min-h-screen bg-[#F5F7F5] pb-24 lg:pb-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md flex-shrink-0">
            <StickyNote className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t("notes.title")}</h1>
            <p className="text-sm text-gray-500">{t("notes.subtitle")}</p>
          </div>
        </div>

        {/* Add note form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={t("notes.noteText")}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent resize-none"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <select
              value={noteCrop}
              onChange={(e) => setNoteCrop(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-400 text-base"
            >
              <option value="">{t("notes.selectCrop")}</option>
              {crops.map((c) => (
                <option key={c.id} value={c.id}>
                  {t(c.nameKey)}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddNote}
              disabled={!noteText.trim()}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
            >
              <Plus className="w-5 h-5" />
              {t("notes.add")}
            </button>
          </div>
        </div>

        {/* Notes list */}
        {notes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <StickyNote className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">{t("notes.empty")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => {
              const cropName = getCropName(note.cropId);
              const isEditing = editingId === note.id;
              return (
                <div
                  key={note.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
                      />
                      <select
                        value={editCrop}
                        onChange={(e) => setEditCrop(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-400 text-base"
                      >
                        <option value="">{t("notes.selectCrop")}</option>
                        {crops.map((c) => (
                          <option key={c.id} value={c.id}>
                            {t(c.nameKey)}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          {t("notes.save")}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          {t("notes.cancel")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm text-gray-800 leading-relaxed flex-1">{note.text}</p>
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleStartEdit(note)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label={t("notes.edit")}
                          >
                            <Pencil className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                            aria-label={t("notes.delete")}
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {cropName && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium">
                            <Sprout className="w-3 h-3" />
                            {cropName}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">{formatDate(note.date)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4 text-center">{t("notes.saved")}</p>
      </div>
    </div>
  );
}
