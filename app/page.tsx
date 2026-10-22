'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Cpu,
  Globe,
  HelpCircle,
  Layers,
  Menu,
  MessageSquare,
  Monitor,
  RefreshCw,
  ShieldCheck,
  Sliders,
  Store,
  X
} from 'lucide-react';

export default function KbtoLabsEnterprise() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    industry: '',
    scale: '',
    hardware: '',
    painPoint: ''
  });
  const [billingPeriod, setBillingPeriod] = useState<'mensual' | 'anual'>('mensual');

  const questions = [
    {
      id: 'industry',
      stepLabel: 'Paso 01 de 04',
      title: '¿Qué área de tu negocio deseas digitalizar?',
      subtitle: 'Selecciona el giro principal para calcular la licencia de software adecuada.',
      options: [
        {
          label: 'Punto de Venta (Restaurante, Cafetería o Comercio)',
          desc: 'Cobro en mostrador, impresión de tickets, cortes de caja e inventario.',
          value: 'pos',
          tag: 'COMERCIAL'
        },
        {
          label: 'Monitoreo y Automatización (Sensores IoT)',
          desc: 'Control de temperatura, energía, cuartos fríos o maquinaria en vivo.',
          value: 'iot',
          tag: 'INDUSTRIAL'
        },
        {
          label: 'Plataforma Web o Sistema Administrativo',
          desc: 'Software a la medida, portales para eventos, clientes o control interno.',
          value: 'custom',
          tag: 'EMPRESARIAL'
        },
        {
          label: 'Solución Integral (Punto de Venta + Automatización)',
          desc: 'Administración comercial unificada con sensores y control físico.',
          value: 'hybrid',
          tag: 'COMPLETO'
        }
      ]
    },
    {
      id: 'scale',
      stepLabel: 'Paso 02 de 04',
      title: '¿Cuál es el tamaño actual de tu operación?',
      subtitle: 'Con esto definimos el plan exacto para que solo pagues por lo que utilizas.',
      options: [
        {
          label: 'Negocio de 1 local (1 caja o punto de cobro)',
          desc: 'Operación ágil para emprendimientos, snacks, consultorios o tiendas locales.',
          value: 'single',
          tag: 'PLAN BASE'
        },
        {
          label: 'Negocio establecido (2 a 3 cajas o áreas de trabajo)',
          desc: 'Restaurantes o comercios con personal en turnos, cocina y almacén.',
          value: 'multi',
          tag: 'PLAN ESTÁNDAR'
        },
        {
          label: 'Multi-sucursal u operación de alto volumen',
          desc: 'Varias ubicaciones o requerimiento de monitoreo continuo 24/7.',
          value: 'enterprise',
          tag: 'PLAN PRO'
        }
      ]
    },
    {
      id: 'hardware',
      stepLabel: 'Paso 03 de 04',
      title: '¿Cuentas ya con equipo de cómputo o terminales?',
      subtitle: 'El precio de nuestros planes cubre el software; el equipo físico es opcional.',
      options: [
        {
          label: 'Ya tengo mis propios dispositivos',
          desc: 'Usaré mi propia computadora, laptop, tablet o teléfono actual.',
          value: 'none',
          tag: 'SOLO SOFTWARE'
        },
        {
          label: 'Requiero cotizar impresora de tickets o cajón',
          desc: 'Me interesa agregar accesorios de cobro a mi cotización por separado.',
          value: 'pos_hw',
          tag: 'EQUIPO OPCIONAL'
        },
        {
          label: 'Requiero cotizar sensores o controladores físicos',
          desc: 'Necesito que fabriquen e instalen los módulos de medición en mi local.',
          value: 'iot_hw',
          tag: 'INGENIERÍA'
        },
        {
          label: 'Solicitar diagnóstico presencial sin compromiso',
          desc: 'Prefiero que revisen mi negocio para saber qué dispositivos me convienen.',
          value: 'advise',
          tag: 'ASESORÍA'
        }
      ]
    },
    {
      id: 'painPoint',
      stepLabel: 'Paso 04 de 04',
      title: '¿Cuál es tu prioridad principal al implementar el sistema?',
      subtitle: 'Configuraremos los módulos iniciales para resolver esto desde el primer día.',
      options: [
        {
          label: 'Control exacto de dinero e inventario',
          desc: 'Evitar faltantes en cortes de caja, fugas de mercancía y cuentas en papel.',
          value: 'control',
          tag: 'FINANZAS'
        },
        {
          label: 'Agilizar el servicio y ahorrar tiempo',
          desc: 'Cobrar más rápido, automatizar el cálculo de propinas y eliminar filas.',
          value: 'speed',
          tag: 'OPERACIÓN'
        },
        {
          label: 'Supervisión remota desde el teléfono',
          desc: 'Consultar ventas en tiempo real, reportes y alertas sin estar en el local.',
          value: 'remote',
          tag: 'DIRECCIÓN'
        }
      ]
    }
  ];

  const handleSelectOption = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const resetWizard = () => {
    setAnswers({ industry: '', scale: '', hardware: '', painPoint: '' });
    setStep(0);
  };

  const getRecommendation = () => {
    if (answers.industry === 'pos') {
      const isBasic = answers.scale === 'single';
      const isPro = answers.scale === 'enterprise';
      return {
        name: isBasic
          ? 'Plan Base — Kbto POS Inicial'
          : isPro
          ? 'Plan Pro — Ecosistema Comercial'
          : 'Plan Estándar — Kbto POS Negocio',
        price: isBasic ? '$299 MXN / mes' : isPro ? '$699 MXN / mes' : '$449 MXN / mes',
        badge: 'LICENCIA DE SOFTWARE EN LA NUBE',
        desc: 'Sistema completo de punto de venta para control de caja, emisión de tickets, gestión de catálogo e inventario en tiempo real.',
        hwNote:
          answers.hardware === 'none'
            ? 'Sin costo de equipo: Lo instalamos directamente en tu computadora, tablet o celular actual.'
            : 'Nota sobre equipo: El hardware (impresoras térmicas, cajón o pantallas) se cotiza por separado según los modelos que elijas.',
        benefit: 'Activación inmediata, respaldos automáticos y capacitación incluida para tu personal.'
      };
    }
    if (answers.industry === 'iot' || answers.industry === 'hybrid') {
      return {
        name: 'Plan Pro — Plataforma Kyros IoT & Control',
        price: '$699 MXN / mes',
        badge: 'SOFTWARE DE TELEMETRÍA Y GESTIÓN',
        desc: 'Panel central en la nube para monitoreo de sensores, alertas en tiempo real, bitácoras históricas y control de dispositivos a distancia.',
        hwNote:
          'Nota sobre equipo: Los nodos físicos, sensores y gabinetes se cotizan por separado de acuerdo al número de puntos a medir.',
        benefit: 'Vigilancia continua 24/7 de tus instalaciones directamente en tu teléfono móvil.'
      };
    }
    return {
      name: 'Desarrollo Web / Plataforma a Medida',
      price: 'Desde $3,800 MXN (Proyecto)',
      badge: 'INGENIERÍA DE SOFTWARE DEDICADA',
      desc: 'Diseño y programación de una plataforma web exclusiva adaptada a las reglas operativas de tu empresa o evento.',
      hwNote:
        'Funciona en cualquier navegador móvil o de escritorio sin requerir compra de servidores físicos.',
      benefit: 'Entrega llave en mano con panel de administración propio y soporte técnico directo.'
    };
  };

  const recommendation = getRecommendation();

  const pricingPlans = [
    {
      name: 'Base',
      subtitle: 'POS Inicial',
      monthlyPrice: '299',
      annualPrice: '249',
      unit: '/ mes',
      description: 'Para cafeterías, snacks, food trucks o comercios con 1 punto de cobro.',
      featured: false,
      features: [
        '1 Caja o dispositivo activo',
        'Ventas y tickets digitales ilimitados',
        'Catálogo de productos con fotografía',
        'Corte de caja diario automatizado',
        'Acceso desde computadora, tablet o celular',
        'Soporte técnico remoto incluido'
      ],
      ctaText: 'Elegir Plan Base'
    },
    {
      name: 'Estándar',
      subtitle: 'POS Negocio',
      monthlyPrice: '449',
      annualPrice: '375',
      unit: '/ mes',
      description: 'Para restaurantes y tiendas que requieren control de inventario y personal.',
      featured: false,
      features: [
        'Hasta 3 cajas o dispositivos simultáneos',
        'Control de inventario e insumos en vivo',
        'Módulo de cálculo de turnos y propinas',
        'Cortes de caja ciegos y arqueo de efectivo',
        'Compatible con impresoras y lectores USB/Red',
        'Capacitación inicial para tu equipo'
      ],
      ctaText: 'Elegir Plan Estándar'
    },
    {
      name: 'Pro',
      subtitle: 'Control Total + Cloud',
      monthlyPrice: '699',
      annualPrice: '580',
      unit: '/ mes',
      description: 'Para negocios con alto flujo, varias áreas o monitoreo de sensores IoT.',
      featured: true,
      features: [
        'Dispositivos y usuarios ilimitados',
        'Panel directivo multi-sucursal en tiempo real',
        'Integración con tablero de sensores Kyros IoT',
        'Auditoría avanzada de movimientos y cancelaciones',
        'Reportes financieros descargables',
        'Soporte prioritario presencial y remoto'
      ],
      ctaText: 'Solicitar Plan Pro'
    },
    {
      name: 'A Medida',
      subtitle: 'Web & Eventos',
      monthlyPrice: '3,800',
      annualPrice: '3,800',
      unit: 'desde (pago único)',
      description: 'Desarrollo de sistemas exclusivos, páginas corporativas o apps para eventos.',
      featured: false,
      features: [
        'Diseño y arquitectura 100% personalizada',
        'Plataformas interactivas para eventos masivos',
        'Sistemas internos de clientes o cotizaciones',
        'Base de datos en la nube de alta velocidad',
        'Optimizado para teléfonos y computadoras',
        'Sin rentas mensuales forzosas de licencia'
      ],
      ctaText: 'Cotizar Proyecto'
    }
  ];

  return (
    <main className="min-h-screen bg-[#F4F7FE] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* BARRA SUPERIOR CORPORATIVA */}
      <div className="w-full bg-white border-b border-slate-200 px-4 sm:px-8 py-2.5 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium text-slate-800">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Kbto Labs — Ingeniería de Software, Puntos de Venta y Automatización</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-slate-500">
            <span>Atención en Guasave, Sinaloa y todo México</span>
            <span>|</span>
            <span>Precios transparentes en MXN</span>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-600/20">
              K
            </div>
            <div className="flex flex-col">
              <div className="leading-none">
                <span className="text-xl font-black tracking-tight text-slate-900">KBTO</span>
                <span className="text-xl font-semibold text-blue-600">LABS</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">
                Software & Sistemas
              </span>
            </div>
          </a>

          {/* Enlaces Desktop */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#soluciones" className="hover:text-blue-600 transition-colors">
              Soluciones
            </a>
            <a href="#precios" className="hover:text-blue-600 transition-colors">
              Precios
            </a>
            <a href="#diagnostico" className="text-blue-600">
              Diagnóstico Interactivo
            </a>
            <a href="#proyectos" className="hover:text-blue-600 transition-colors">
              Casos Reales
            </a>
            <a href="#comparativa" className="hover:text-blue-600 transition-colors">
              Ventajas
            </a>
          </div>

          {/* Botones CTA Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#precios"
              className="text-slate-700 hover:text-blue-600 font-semibold text-sm px-4 py-2 transition-colors"
            >
              Ver Tarifas
            </a>
            <a
              href="#diagnostico"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
            >
              Cotizar Sistema <ArrowRight size={16} />
            </a>
          </div>

          {/* Botón Menú Móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-200 flex flex-col gap-2 pb-2">
            <a
              href="#soluciones"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-semibold"
            >
              Soluciones para Negocios
            </a>
            <a
              href="#precios"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-semibold"
            >
              Tabla de Precios (Software)
            </a>
            <a
              href="#diagnostico"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold"
            >
              Asistente para elegir tu sistema
            </a>
            <a
              href="#proyectos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 text-sm font-semibold"
            >
              Sistemas Desarrollados
            </a>
            <a
              href="#precios"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full bg-blue-600 text-white font-semibold text-center py-3 rounded-full text-sm shadow-md shadow-blue-600/20"
            >
              Ver Planes y Precios
            </a>
          </div>
        )}
      </nav>

      {/* HERO SECTION LUMINOSO Y CORPORATIVO */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Layers size={14} /> Tecnología Comercial e Industrial
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08]">
              Software claro y rápido para{' '}
              <span className="text-blue-600">controlar todo tu negocio.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              En <strong className="text-slate-900 font-semibold">Kbto Labs</strong> desarrollamos sistemas Punto de Venta (POS), plataformas web y soluciones de monitoreo físico. Automatiza tus cortes de caja, inventarios y operación con precios transparentes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#precios"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full text-sm sm:text-base transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                Ver Planes desde $299/mes <ArrowRight size={18} />
              </a>
              <a
                href="#diagnostico"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold px-8 py-4 rounded-full text-sm sm:text-base transition-all text-center"
              >
                Hacer Diagnóstico Rápido
              </a>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left border-t border-slate-200">
              <div>
                <div className="text-slate-900 font-black text-lg sm:text-xl">Sin Plazos</div>
                <div className="text-xs text-slate-500">Planes mensuales claros sin contratos forzosos</div>
              </div>
              <div>
                <div className="text-slate-900 font-black text-lg sm:text-xl">Multi-Equipo</div>
                <div className="text-xs text-slate-500">Usa tu propia PC, tablet o teléfono móvil</div>
              </div>
              <div>
                <div className="text-slate-900 font-black text-lg sm:text-xl">Soporte Local</div>
                <div className="text-xs text-slate-500">Atención directa de ingeniería sin intermediarios</div>
              </div>
            </div>
          </div>

          {/* Panel Visual Derecho: Resumen de Ecosistema en Tema Claro */}
          <div className="lg:col-span-5">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                    Ecosistema Kbto Labs
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900">Tres divisiones especializadas</h2>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Disponible
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm hover:border-blue-400 transition-colors">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                    <Store size={22} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">Punto de Venta (POS)</h3>
                      <span className="text-xs font-bold text-blue-600">Desde $299/mes</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Cobro rápido, cortes de caja, control de inventario, cálculo de propinas y emisión de tickets.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm hover:border-blue-400 transition-colors">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                    <Globe size={22} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">Plataformas Web a Medida</h3>
                      <span className="text-xs font-bold text-indigo-600">Pago por Proyecto</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Sistemas administrativos propios, portales interactivos para eventos y catálogos en línea.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm hover:border-blue-400 transition-colors">
                  <div className="p-3 rounded-xl bg-slate-100 text-slate-800 shrink-0">
                    <Cpu size={22} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">Monitoreo y Sensores IoT</h3>
                      <span className="text-xs font-bold text-slate-700">Software + Hardware</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Telemetría en vivo para cuartos fríos, consumo eléctrico y automatización de equipos físicos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>¿Buscas orientación personalizada?</span>
                <a
                  href="#diagnostico"
                  className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  Responder 4 preguntas <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRECIOS REALES (DISEÑO INSPIRADO EN LAS TARJETAS DE REFERENCIA) */}
      <section id="precios" className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            Precios Claros y Competitivos
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4">
            Elige el plan ideal para tu negocio
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Precios expresados en Pesos Mexicanos (MXN) correspondientes a la licencia de software. Puedes utilizar tus propios dispositivos actuales sin obligación de comprar equipo.
          </p>

          {/* Selector Mensual / Anual */}
          <div className="mt-8 inline-flex items-center bg-white border border-slate-200 p-1.5 rounded-full shadow-sm">
            <button
              onClick={() => setBillingPeriod('mensual')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                billingPeriod === 'mensual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pago Mensual
            </button>
            <button
              onClick={() => setBillingPeriod('anual')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                billingPeriod === 'anual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pago Anual (Ahorra 16%)
            </button>
          </div>
        </div>

        {/* Grid de 4 Tarjetas al estilo de la referencia visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingPlans.map((plan, index) => {
            const displayedPrice =
              billingPeriod === 'mensual' ? plan.monthlyPrice : plan.annualPrice;

            return (
              <div
                key={index}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  plan.featured
                    ? 'bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-600/30 lg:-translate-y-3'
                    : 'bg-white text-slate-900 border border-slate-200/90 shadow-xl shadow-slate-200/50'
                }`}
              >
                {plan.featured && (
                  <div className=" -top-3.5 left-1/2 -translate-x-1/2 absolute bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    Más Popular
                  </div>
                )}

                <div>
                  <div className="text-center pb-6 border-b border-current/10">
                    <h3
                      className={`text-lg font-extrabold ${
                        plan.featured ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <span
                      className={`text-xs font-semibold block mt-0.5 ${
                        plan.featured ? 'text-blue-100' : 'text-blue-600'
                      }`}
                    >
                      {plan.subtitle}
                    </span>

                    <div className="mt-6 flex items-baseline justify-center gap-1">
                      <span className="text-sm font-bold">$</span>
                      <span className="text-4xl font-black tracking-tight">{displayedPrice}</span>
                      <span
                        className={`text-xs font-semibold ${
                          plan.featured ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        MXN
                      </span>
                    </div>
                    <span
                      className={`text-[11px] block mt-1 ${
                        plan.featured ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {plan.unit}
                    </span>

                    <p
                      className={`text-xs mt-4 leading-relaxed ${
                        plan.featured ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3.5 my-6 text-xs sm:text-sm">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <div
                          className={`p-0.5 rounded-full mt-0.5 shrink-0 ${
                            plan.featured
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          <Check size={14} />
                        </div>
                        <span className={plan.featured ? 'text-white' : 'text-slate-600'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/5216878761208?text=${encodeURIComponent(
                    `Hola Kbto Labs, me interesa contratar el plan ${plan.name} (${plan.subtitle}) de$ ${displayedPrice} MXN.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm text-center transition-all shadow-md ${
                    plan.featured
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/15'
                  }`}
                >
                  {plan.ctaText}
                </a>
              </div>
            );
          })}
        </div>

        {/* Nota Aclaratoria sobre Equipos Físicos */}
        <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0 mt-0.5">
              <HelpCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                ¿Necesitas impresoras de tickets, cajones de dinero, terminales o sensores físicos?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Los precios anteriores corresponden únicamente al software para que no pagues de más si ya tienes computadora o tablet. Si requieres equipamiento físico o sensores IoT, los cotizamos a la medida de tu local.
              </p>
            </div>
          </div>
          <a
            href="#diagnostico"
            className="shrink-0 text-xs font-bold text-blue-600 hover:text-blue-800 border border-blue-200 bg-blue-50 px-4 py-2.5 rounded-full transition-colors"
          >
            Calcular con Equipo
          </a>
        </div>
      </section>

      {/* DIAGNÓSTICO INTERACTIVO EN TEMA CLARO (OPTIMIZADO PARA MÓVIL) */}
      <section
        id="diagnostico"
        className="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-8 bg-white border-y border-slate-200"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase">
              <Sliders size={14} /> Configurador Inteligente
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3">
              Descubre qué plan se adapta a tu operación
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Responde 4 preguntas rápidas para obtener una recomendación con precio estimado de software.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-5 sm:p-10 shadow-lg shadow-slate-200/50">
            {/* Cabecera del Cuestionario */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1.5 rounded-lg">
                  {step < 4 ? questions[step].stepLabel : 'Diagnóstico Completado'}
                </span>
                {step > 0 && step < 4 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline"
                  >
                    Regresar al paso anterior
                  </button>
                )}
              </div>

              {/* Barra de Progreso */}
              <div className="grid grid-cols-4 gap-2 w-full sm:w-64">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      step > idx
                        ? 'bg-blue-600'
                        : step === idx
                        ? 'bg-blue-400'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {step < questions.length ? (
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                  {questions[step].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">{questions[step].subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(questions[step].id, opt.value)}
                      className="text-left bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-600 rounded-2xl p-5 transition-all group shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {opt.tag}
                          </span>
                          <ChevronRight
                            size={18}
                            className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform shrink-0"
                          />
                        </div>
                        <div className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                          {opt.label}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Resultado del Diagnóstico */
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3.5 py-1 rounded-full text-xs font-bold">
                    <ShieldCheck size={16} /> {recommendation.badge}
                  </span>
                  <div className="bg-white border border-blue-200 px-4 py-1.5 rounded-full">
                    <span className="text-xs text-slate-500 mr-1.5">Tarifa de Software:</span>
                    <span className="text-sm font-black text-blue-600">{recommendation.price}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {recommendation.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    {recommendation.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4">
                    <span className="text-xs font-bold uppercase text-blue-600 block mb-1">
                      Consideración sobre Equipo Físico
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {recommendation.hwNote}
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4">
                    <span className="text-xs font-bold uppercase text-emerald-700 block mb-1">
                      Beneficio Operativo Directo
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {recommendation.benefit}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                  <a
                    href={`https://wa.me/5216878761208?text=${encodeURIComponent(
                      `Hola Kbto Labs, realicé el diagnóstico en su web. Mi resultado fue: ${recommendation.name} (${recommendation.price}). Giro: ${answers.industry}, Escala: ${answers.scale}, Equipo: ${answers.hardware}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    <MessageSquare size={18} /> Solicitar Demostración por WhatsApp
                  </a>
                  <button
                    onClick={resetWizard}
                    className="py-4 px-6 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={15} /> Reiniciar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECCIÓN DETALLADA DE SOLUCIONES */}
      <section id="soluciones" className="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Divisiones de Ingeniería
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Qué incluye cada solución de Kbto Labs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Monitor size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                Sistemas Punto de Venta (POS)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Diseñado para que cualquier cajero o encargado cobre en segundos sin errores matemáticos al cerrar el turno.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 border-t border-slate-100 pt-5 mb-6">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0" />
                  <span>Cortes de caja y arqueo de efectivo</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0" />
                  <span>Pagos en efectivo, tarjeta y transferencia</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0" />
                  <span>Reparto automatizado de propinas por horas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-blue-600 shrink-0" />
                  <span>Impresión de tickets térmicos de venta</span>
                </li>
              </ul>
            </div>
            <a
              href="#precios"
              className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1"
            >
              Ver planes POS desde $299/mes <ArrowRight size={15} />
            </a>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                Automatización y Telemetría IoT
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Integramos sensores industriales a una plataforma web para supervisar variables físicas de tu negocio en tiempo real.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 border-t border-slate-100 pt-5 mb-6">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-indigo-600 shrink-0" />
                  <span>Vigilancia de temperatura en refrigeración</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-indigo-600 shrink-0" />
                  <span>Encendido remoto de equipos e iluminación</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-indigo-600 shrink-0" />
                  <span>Diseño de circuitos y gabinetes a medida</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-indigo-600 shrink-0" />
                  <span>Alertas inmediatas ante fallos eléctricos</span>
                </li>
              </ul>
            </div>
            <a
              href="#diagnostico"
              className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-1"
            >
              Configurar proyecto de monitoreo <ArrowRight size={15} />
            </a>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                Desarrollo Web y Sistemas Cloud
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Construimos aplicaciones web rápidas y personalizadas para empresas u organizaciones que requieren flujos únicos.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 border-t border-slate-100 pt-5 mb-6">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-slate-800 shrink-0" />
                  <span>Plataformas interactivas para congresos y eventos</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-slate-800 shrink-0" />
                  <span>Sistemas de administración y bases de datos</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-slate-800 shrink-0" />
                  <span>Sitios corporativos enfocados en ventas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-slate-800 shrink-0" />
                  <span>Adaptación perfecta a teléfonos celulares</span>
                </li>
              </ul>
            </div>
            <a
              href="#precios"
              className="text-slate-900 font-bold text-sm hover:underline flex items-center gap-1"
            >
              Ver modalidad por proyecto <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* CASOS DE ÉXITO / SISTEMAS DESPLEGADOS */}
      <section
        id="proyectos"
        className="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-8 bg-white border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Portafolio Empresarial
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                Soluciones en operación desarrolladas por Kbto Labs
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Sistemas reales construidos con tecnología moderna en la nube para comercios, eventos e industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Punto de Venta
                  </span>
                  <Store size={22} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  Destellos POS & Suite Comercial
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Plataforma web de punto de venta con cierre de caja, generación de tickets, múltiples métodos de pago y carga de imágenes de productos en la nube.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>React + Cloud Database</span>
                <a href="#precios" className="text-blue-600 hover:underline">
                  Ver planes compatibles
                </a>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    Hardware & IoT
                  </span>
                  <Cpu size={22} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  Kyros — Sistema Modular IIoT
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Arquitectura de monitoreo ambiental e industrial mediante microcontroladores ESP32, sensores dedicados y panel de control web en tiempo real.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Hardware Propio + Web Gateway</span>
                <a href="#diagnostico" className="text-indigo-600 hover:underline">
                  Cotizar implementación
                </a>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-slate-700 bg-slate-200/70 px-3 py-1 rounded-full">
                    Plataformas Cloud
                  </span>
                  <BarChart3 size={22} className="text-slate-800" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  Sistemas para Eventos y Personal
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Galerías interactivas en tiempo real con moderación administrativa para congresos y aplicaciones web para distribución exacta de propinas y turnos.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Next.js + Tiempo Real</span>
                <a href="#precios" className="text-slate-900 hover:underline">
                  Cotizar a medida
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIVA CLARA */}
      <section id="comparativa" className="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Por qué actualizar la administración de tu negocio
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Diferencias operativas entre llevar cuentas manuales y utilizar la infraestructura de Kbto Labs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
            <div className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
              <X size={18} className="text-rose-600" /> Métodos Tradicionales o Software Antiguo
            </div>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <span>Pérdida de tiempo cuadrando efectivo, notas de papel o archivos de Excel.</span>
              </li>
              <li className="flex items-start gap-3">
                <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <span>Licencias caras que te obligan a comprar servidores o equipos específicos.</span>
              </li>
              <li className="flex items-start gap-3">
                <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <span>Imposibilidad de revisar las ventas del día si no estás dentro del local.</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-600/20">
            <div className="text-blue-100 font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
              <Check size={18} className="text-white" /> Con Software de Kbto Labs
            </div>
            <ul className="space-y-4 text-sm text-blue-50">
              <li className="flex items-start gap-3">
                <Check size={16} className="text-white shrink-0 mt-0.5" />
                <span>Cortes de caja, inventarios y reparto de propinas calculados al instante.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={16} className="text-white shrink-0 mt-0.5" />
                <span>Planes accesibles desde $299 MXN/mes usando tus dispositivos actuales.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={16} className="text-white shrink-0 mt-0.5" />
                <span>Panel en vivo desde cualquier teléfono móvil y soporte directo en tu ciudad.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black">
              K
            </div>
            <span className="font-black text-slate-900 text-sm">KBTO LABS</span>
            <span className="text-slate-400">| Software, POS & Hardware</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-semibold text-slate-600">
            <a href="#soluciones" className="hover:text-blue-600">
              Soluciones
            </a>
            <a href="#precios" className="hover:text-blue-600">
              Precios
            </a>
            <a href="#diagnostico" className="hover:text-blue-600">
              Diagnóstico
            </a>
            <a href="#proyectos" className="hover:text-blue-600">
              Portafolio
            </a>
          </div>

          <div className="text-center sm:text-right">
            © 2026 Kbto Labs. Guasave, Sinaloa, México. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}