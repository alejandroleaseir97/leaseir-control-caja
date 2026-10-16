"use client";

import { useEffect } from "react";

/**
 * La pantalla cuando el render del servidor se cae.
 *
 * La página se calcula en el servidor y dentro del render llama a Holded. Si
 * Holded tarda de más, devuelve un 500 o cierra la conexión, la excepción sube
 * hasta arriba y Next contesta un 500 pelado: lo que ve quien está delante es
 * la pantalla en negro del navegador con un código de error que no dice nada.
 *
 * Esto no arregla la lectura —si Holded está caído, sigue caído— pero convierte
 * ese callejón sin salida en algo que se entiende y de lo que se sale con un
 * clic. `reset()` vuelve a montar la página, que es volver a pedir los datos.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[fcf] el render del servidor ha fallado", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 px-6">
      <h1 className="text-lg font-medium text-[var(--text-primary)]">
        No se han podido leer los datos
      </h1>
      <p className="text-sm text-[var(--text-secondary)]">
        La página lee Holded en directo al cargarse. Esta vez no ha contestado a tiempo o ha
        devuelto un error, así que no hay nada que enseñar todavía. No se ha perdido ni cambiado
        ningún dato: basta con volver a intentarlo.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="rounded border border-[var(--axis)] px-3 py-1.5 text-sm text-[var(--text-primary)] hover:bg-[var(--grid)]"
        >
          Reintentar
        </button>
        <a
          href="/"
          className="text-sm text-[var(--text-muted)] underline underline-offset-4 hover:text-[var(--text-primary)]"
        >
          Volver al principio
        </a>
      </div>
      {error.digest && (
        <p className="text-xs text-[var(--text-muted)]">
          Referencia del error: <code>{error.digest}</code>
        </p>
      )}
    </main>
  );
}
