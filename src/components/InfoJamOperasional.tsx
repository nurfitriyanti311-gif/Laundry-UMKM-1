// Menampilkan info jam operasional toko dan jadwal penjemputan dari konfigurasi resmi PRD (FT-07).

interface InfoJamOperasionalProps {
  jamBuka: string;
  jamJemput: string;
}

export function InfoJamOperasional({
  jamBuka,
  jamJemput,
}: InfoJamOperasionalProps) {
  return (
    <div
      aria-label="Informasi jam operasional toko"
      className="flex flex-wrap gap-x-6 gap-y-1 pt-1 text-sm text-neutral-600 tabular-nums"
    >
      <span>Buka {jamBuka}</span>
      <span>Jadwal jemput {jamJemput}</span>
    </div>
  );
}
