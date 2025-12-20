'use client';

import { useAuth } from '@/context/AuthContext';
import DashboardCliente from './components/DashboardCliente';
import ServiciosDoblesCarousel from './components/carruseltertulia';

export default function DashboardHome() {
  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="bg-[#0A1F33] text-white rounded-xl p-10">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a FJONIC Studio
        </h1>
        <p className="text-blue-200 max-w-2xl">
          Creamos soluciones digitales modernas, seguras y escalables para
          empresas que quieren crecer con tecnología.
        </p>


      </section>

      {/* QUIÉNES SOMOS */}
      <section className="bg-white rounded-xl p-8 shadow">
        <h2 className="text-2xl font-semibold text-[#0A1F33] mb-4">
          ¿Quiénes somos?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          FJONIC Studio nace como un proyecto enfocado en el desarrollo de
          plataformas web, sistemas empresariales y soluciones tecnológicas
          personalizadas. Nuestro objetivo es ayudar a empresas a digitalizar
          sus procesos y mejorar su productividad mediante tecnología moderna.
        </p>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow">
          <h3 className="text-xl font-semibold text-[#0A1F33] mb-3">
            Misión
          </h3>
          <p className="text-gray-700">
            Desarrollar soluciones tecnológicas eficientes, seguras y
            escalables que aporten valor real a nuestros clientes,
            acompañándolos en su crecimiento digital.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow">
          <h3 className="text-xl font-semibold text-[#0A1F33] mb-3">
            Visión
          </h3>
          <p className="text-gray-700">
            Ser un estudio tecnológico reconocido por la calidad, innovación
            y compromiso en cada proyecto, impactando positivamente en
            empresas a nivel nacional e internacional.
          </p>
        </div>
      </section>

      {/* CÓMO NACIÓ */}
      <section className="bg-white rounded-xl p-8 shadow">
        <h2 className="text-2xl font-semibold text-[#0A1F33] mb-4">
          ¿Cómo nació FJONIC?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          FJONIC Studio surge de la pasión por la tecnología y el desarrollo
          de software. Inició como una iniciativa académica y personal que,
          con el tiempo, evolucionó hacia la creación de soluciones reales
          para clientes, combinando diseño, desarrollo y estrategia digital.
        </p>
      </section>

      {/* EMPRESAS / EXPERIENCIA */}
      <section className="bg-white rounded-xl p-8 shadow">
        <h2 className="text-2xl font-semibold text-[#0A1F33] mb-6">
          Experiencia y colaboración
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <li>✔ Desarrollo de plataformas web empresariales</li>
          <li>✔ Sistemas de gestión de proyectos</li>
          <li>✔ Dashboards administrativos</li>
          <li>✔ Aplicaciones internas para empresas</li>
          <li>✔ Automatización de procesos</li>
          <li>✔ Integraciones backend y frontend</li>
        </ul>
      </section>

      {/* VALORES */}
      <section className="bg-[#0A1F33] text-white rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Nuestros valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-200">
          <div>
            <h4 className="font-semibold text-white mb-2">Innovación</h4>
            <p>Usamos tecnologías modernas y buenas prácticas.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Compromiso</h4>
            <p>Cada proyecto es tratado con responsabilidad y seriedad.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Calidad</h4>
            <p>Código limpio, escalable y mantenible.</p>
          </div>
        </div>
      </section>
      <section className="space-y-4">
  <h2 className="text-2xl font-semibold text-[#0A1F33]">
    Resultados con nuestros clientes
  </h2>

  <p className="text-gray-600 max-w-2xl">
    Así ayudamos a distintas empresas a mejorar su imagen,
    presencia digital y resultados comerciales.
  </p>

  <ServiciosDoblesCarousel />
</section>
    </div>
  );
}
