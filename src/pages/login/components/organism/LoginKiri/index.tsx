import "../../../styles/Login.css";

export default function LoginKiri() {
  return (
    <div className="kiri">
      <div className="kiri-wrapper-dark">
        <div className="flex size-full items-center p-12">
          <div className="flex flex-col gap-6 pb-10">
            <div className="flex items-center gap-5">
              <img src="/image/stei-kiri.png" alt="" className="size-14" />

              <div className="flex flex-col">
                <p className="font-medium">
                  Sekolah Teknik Elektro dan Informatika{" "}
                </p>
                <p className="font-medium">Institut Teknologi Bandung </p>
              </div>
            </div>
            <div className="flex flex-col">
              <h1>GraduIT</h1>
              <h2>Thesis & TA Monitoring</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
