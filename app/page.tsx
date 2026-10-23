'use client';

import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  ChevronRight,
  Cpu,
  Globe,
  Layers,
  Menu,
  MessageSquare,
  Monitor,
  Plus,
  Printer,
  RefreshCw,
  ShieldCheck,
  Sliders,
  Store,
  Thermometer,
  Trash2,
  Wifi,
  X,
  Zap
} from 'lucide-react';

// Componente con Física 3D al Cursor + Luz Radial (Spotlight)
function TiltSpotlightCard({
  children,
  className = '',
  dark = false
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    spotX: 50,
    spotY: 50,
    opacity: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      spotX: (x / rect.width) * 100,
      spotY: (y / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setStyle((prev) => ({
      ...prev,
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      opacity: 0
    }));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: style.transform,
        transition: 'transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: style.opacity,
          background: dark
            ? `radial-gradient(380px circle at ${style.spotX}% ${style.spotY}%, rgba(59, 130, 246, 0.22), transparent 75%)`
            : `radial-gradient(380px circle at ${style.spotX}% ${style.spotY}%, rgba(37, 99, 235, 0.09), transparent 75%)`
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function KbtoLabsInteractive() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estado del Laboratorio Interactivo en el Hero (No Lineal)
  const [activeLabTab, setActiveLabTab] = useState<'pos' | 'iot3d' | 'cloud'>('pos');

  // Estados del Simulador POS en Vivo
  const [dailySales, setDailySales] = useState(14850);
  const [ticketCount, setTicketCount] = useState(42);
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; qty: number }>>([
    { id: '1', name: 'Café Americano Especial', price: 48, qty: 2 },
    { id: '2', name: 'Orden de Tacos / Platillo', price: 145, qty: 1 }
  ]);
  const [ticketPrinted, setTicketPrinted] = useState(false);

  // Estados del Gemelo Digital 3D (Kyros IoT)
  const [cubeRotation, setCubeRotation] = useState({ x: -18, y: 28 });
  const [chamberTemp, setChamberTemp] = useState(3.2);
  const [relayActive, setRelayActive] = useState(true);

  // Estados del Cotizador Paso a Paso
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    industry: '',
    scale: '',
    hardware: '',
    painPoint: ''
  });
  const [billingPeriod, setBillingPeriod] = useState<'mensual' | 'anual'>('mensual');

  // Catálogo rápido para el Simulador POS
  const sampleProducts = [
    { id: '1', name: 'Café Americano Especial', price: 48 },
    { id: '2', name: 'Orden de Tacos / Platillo', price: 145 },
    { id: '3', name: 'Frappé de Oreo Grande', price: 78 },
    { id: '4', name: 'Combo Especial Mostrador', price: 210 }
  ];

  const addProductToSimulator = (prod: { id: string; name: string; price: number }) => {
    setTicketPrinted(false);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.id === prod.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...prod, qty: 1 }];
    });
  };

  const clearSimulatorCart = () => {
    setCart([]);
    setTicketPrinted(false);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleSimulateCharge = () => {
    if (cart.length === 0) return;
    setDailySales((prev) => prev + cartTotal);
    setTicketCount((prev) => prev + 1);
    setTicketPrinted(true);
    setTimeout(() => {
      setCart([{ id: '1', name: 'Café Americano Especial', price: 48, qty: 1 }]);
    }, 1800);
  };

  // Manejo del Modelo 3D Isométrico interactivo
  const handle3DMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setCubeRotation({
      x: -18 + normY * -35,
      y: 28 + normX * 45
    });
  };

  const questions = [
    {
      id: 'industry',
      stepLabel: 'PASO 01 DE 04',
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
      stepLabel: 'PASO 02 DE 04',
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
      stepLabel: 'PASO 03 DE 04',
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
      stepLabel: 'PASO 04 DE 04',
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
      subtitle: 'POS INICIAL',
      capacityLabel: '1 caja activa',
      bars: 2,
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
      subtitle: 'POS NEGOCIO',
      capacityLabel: 'Hasta 3 cajas',
      bars: 4,
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
      subtitle: 'CONTROL TOTAL + CLOUD',
      capacityLabel: 'Sin límite',
      bars: 6,
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
      subtitle: 'WEB & EVENTOS',
      capacityLabel: 'A medida',
      bars: 5,
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
    <main className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-600 selection:text-white pb-24">
      {/* BARRA SUPERIOR */}
      <div className="w-full bg-white border-b border-stone-200/80 px-4 sm:px-8 py-2 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2.5 font-medium text-stone-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span>Kbto Labs — Ingeniería de Software, Puntos de Venta y Automatización</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-stone-500">
            <span>Atención en Guasave, Sinaloa y todo México</span>
            <span>|</span>
            <span>Precios transparentes en MXN</span>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-stone-950 flex items-center justify-center text-white font-bold text-lg transition-transform duration-200 group-hover:scale-105">
              K
            </div>
            <div className="flex flex-col">
              <div className="leading-none">
                <span className="text-lg font-bold tracking-tight text-stone-950">KBTO</span>
                <span className="text-lg font-semibold text-blue-600">LABS</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone-400 font-semibold mt-1">
                Software & Sistemas
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a href="#simulador" className="hover:text-stone-950 transition-colors">
              Simulador en Vivo
            </a>
            <a href="#precios" className="hover:text-stone-950 transition-colors">
              Precios
            </a>
            <a href="#diagnostico" className="hover:text-stone-950 transition-colors">
              Configurador
            </a>
            <a href="#soluciones" className="hover:text-stone-950 transition-colors">
              Ingeniería
            </a>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#diagnostico"
              className="border border-stone-300 bg-white hover:border-stone-900 text-stone-800 font-semibold text-xs px-4 py-2.5 rounded-full transition-colors"
            >
              Diagnóstico Rápido
            </a>
            <a
              href="#precios"
              className="bg-stone-950 hover:bg-blue-600 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors flex items-center gap-2"
            >
              Ver Planes <ArrowRight size={14} />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-11 w-11 rounded-xl border border-stone-200 bg-white flex items-center justify-center text-stone-700"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-200 flex flex-col gap-2 pb-2">
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-white border border-stone-200/80 text-stone-900 text-sm font-semibold"
            >
              Probar Simulador Interactivo
            </a>
            <a
              href="#precios"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-700 text-sm font-semibold"
            >
              Precios en MXN
            </a>
            <a
              href="#diagnostico"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-700 text-sm font-semibold"
            >
              Diagnóstico de 4 Pasos
            </a>
            <a
              href="#soluciones"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-stone-100 text-stone-700 text-sm font-semibold"
            >
              Divisiones de Ingeniería
            </a>
          </div>
        )}
      </nav>

      {/* HERO NO LINEAL CON SIMULADOR WEB INTEGRADO + GEMELO DIGITAL 3D */}
      <section
        id="simulador"
        className="relative overflow-hidden border-b border-stone-200/80 py-10 sm:py-16 px-4 sm:px-8"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #e7e5e4 1px, transparent 1px), linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-sm text-stone-700 text-[11px] font-semibold uppercase tracking-[0.14em]">
              <Layers size={13} className="text-blue-600" /> Ingeniería Interactiva en Vivo
            </div>

            <h1 className="text-[34px] sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.035em] text-stone-950 leading-[1.05]">
              Software claro y rápido para{' '}
              <span className="text-blue-600">controlar todo tu negocio.</span>
            </h1>

            <p className="max-w-[48ch] text-[15px] sm:text-[17px] leading-[1.65] text-stone-600">
              En <strong className="font-semibold text-stone-950">Kbto Labs</strong> desarrollamos sistemas Punto de Venta (POS), plataformas web y monitoreo físico. <strong className="font-semibold text-stone-950">Interactúa con nuestro simulador a la derecha</strong> para probar un cobro en vivo o rotar nuestro nodo 3D de telemetría.
            </p>

            {/* Selector de Experiencia No Lineal */}
            <div className="pt-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 block mb-2.5">
                SELECCIONA EL MÓDULO INTERACTIVO:
              </span>
              <div className="inline-flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-stone-200/90 shadow-sm">
                <button
                  onClick={() => setActiveLabTab('pos')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                    activeLabTab === 'pos'
                      ? 'bg-stone-950 text-white'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  <Store size={14} /> 1. Simulador POS
                </button>
                <button
                  onClick={() => setActiveLabTab('iot3d')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                    activeLabTab === 'iot3d'
                      ? 'bg-blue-600 text-white'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  <Box size={14} /> 2. Nodo 3D Kyros IoT
                </button>
                <button
                  onClick={() => setActiveLabTab('cloud')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                    activeLabTab === 'cloud'
                      ? 'bg-stone-950 text-white'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  <Activity size={14} /> 3. Sincronización Cloud
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#precios"
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-stone-950 hover:bg-blue-600 text-white font-semibold px-7 text-sm transition-colors shadow-sm active:scale-[0.985]"
              >
                Ver Planes desde $299/mes <ArrowRight size={16} />
              </a>
              <a
                href="#diagnostico"
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-white hover:border-blue-600 text-stone-900 border border-stone-300 font-semibold px-6 text-sm transition-colors"
              >
                Hacer Diagnóstico Rápido
              </a>
            </div>
          </div>

          {/* Columna Derecha: SIMULADOR INTERACTIVO EN VIVO + MODELO 3D */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white border border-stone-200/90 shadow-[0_20px_50px_-15px_rgba(12,15,20,0.12)] overflow-hidden">
              <div className="bg-stone-950 text-white px-4 py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono text-[11px] text-stone-300">
                    {activeLabTab === 'pos' && 'SIMULADOR INTERACTIVO — DESTELLOS POS v2.6'}
                    {activeLabTab === 'iot3d' && 'VISOR 3D ISOMÉTRICO — NODO KYROS ESP32'}
                    {activeLabTab === 'cloud' && 'ARQUITECTURA CLOUD — MULTISUCURSAL'}
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">
                  En Vivo
                </span>
              </div>

              {/* MODO 1: SIMULADOR POS FUNCIONAL */}
              {activeLabTab === 'pos' && (
                <div className="p-4 sm:p-6 space-y-4 bg-[#FAF9F6]">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3.5 border border-stone-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        VENTAS ACUMULADAS HOY
                      </span>
                      <div className="text-2xl sm:text-3xl font-bold text-stone-950 mt-0.5">
                        ${dailySales.toLocaleString('es-MX')}
                        <span className="text-xs font-normal text-stone-400">.00 MXN</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        {ticketCount} tickets cobrados en turno
                      </span>
                    </div>

                    <div className="bg-white rounded-xl p-3.5 border border-stone-200/80 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          IMPRESORA TÉRMICA
                        </span>
                        <Printer size={15} className="text-blue-600" />
                      </div>
                      <div className="text-xs font-semibold text-stone-800">
                        {ticketPrinted
                          ? 'Imprimiendo Ticket #00' + ticketCount + '...'
                          : 'Lista para cobrar en 1 clic'}
                      </div>
                      <span className="text-[11px] text-blue-600 font-medium">
                        Toca los productos abajo para probar
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                      TOCA UN PRODUCTO PARA AGREGAR AL TICKET:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {sampleProducts.map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => addProductToSimulator(prod)}
                          className="flex items-center justify-between bg-white hover:bg-blue-50/60 border border-stone-200 hover:border-blue-600 rounded-xl px-3 py-2.5 text-left transition-colors active:scale-[0.98]"
                        >
                          <div className="pr-2">
                            <div className="text-xs font-semibold text-stone-900 line-clamp-1">
                              {prod.name}
                            </div>
                            <div className="text-[11px] font-bold text-blue-600">
                              ${prod.price}.00
                            </div>
                          </div>
                          <div className="h-7 w-7 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                            <Plus size={14} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-stone-200/90 p-4">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-dashed border-stone-200">
                      <span className="text-xs font-bold text-stone-900">
                        Cuenta Actual ({cart.reduce((a, b) => a + b.qty, 0)} artículos)
                      </span>
                      <button
                        onClick={clearSimulatorCart}
                        className="text-[11px] text-stone-400 hover:text-rose-600 flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Limpiar
                      </button>
                    </div>

                    {cart.length === 0 ? (
                      <p className="text-xs text-stone-400 py-3 text-center">
                        Selecciona cualquier producto arriba para simular una venta.
                      </p>
                    ) : (
                      <div className="space-y-1.5 max-h-28 overflow-y-auto text-xs">
                        {cart.map((item) => (
                          <div key={item.id} className="flex justify-between text-stone-700">
                            <span>
                              <strong className="text-stone-950">{item.qty}x</strong> {item.name}
                            </span>
                            <span className="font-semibold text-stone-950">
                              ${item.price * item.qty}.00
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                          TOTAL A COBRAR
                        </span>
                        <span className="text-lg font-bold text-stone-950">
                          ${cartTotal}.00 MXN
                        </span>
                      </div>

                      <button
                        onClick={handleSimulateCharge}
                        disabled={cart.length === 0}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-stone-300 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-colors active:scale-95 flex items-center gap-2"
                      >
                        <Zap size={14} /> Cobrar y Sumar al Corte
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* MODO 2: GEMELO DIGITAL 3D ISOMÉTRICO (KYROS IoT) */}
              {activeLabTab === 'iot3d' && (
                <div className="p-4 sm:p-6 bg-[#0B0F17] text-white space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>Mueve el cursor sobre el módulo 3D para rotar la placa</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        chamberTemp > 6
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {chamberTemp > 6 ? 'ALERTA TÉRMICA ACTIVA' : 'TELEMETRÍA ÓPTIMA'}
                    </span>
                  </div>

                  <div
                    onMouseMove={handle3DMouseMove}
                    onMouseLeave={() => setCubeRotation({ x: -18, y: 28 })}
                    className="relative h-56 rounded-xl bg-gradient-to-b from-slate-900 to-stone-950 border border-slate-800 flex items-center justify-center overflow-hidden cursor-grab"
                    style={{ perspective: '900px' }}
                  >
                    <div
                      style={{
                        transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
                        transformStyle: 'preserve-3d',
                        transition: 'transform 120ms ease-out'
                      }}
                      className="relative w-52 h-36 rounded-2xl bg-slate-900 border-2 border-blue-500/60 shadow-[0_25px_60px_rgba(37,99,235,0.35)] p-4 flex flex-col justify-between"
                    >
                      <div
                        style={{ transform: 'translateZ(26px)' }}
                        className="flex items-center justify-between bg-stone-950/90 border border-slate-700 rounded-lg px-2.5 py-1.5 text-[10px]"
                      >
                        <span className="font-mono text-blue-400 font-bold">ESP32-C6 // KYROS</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            relayActive ? 'bg-emerald-400 animate-ping' : 'bg-stone-600'
                          }`}
                        />
                      </div>

                      <div
                        style={{ transform: 'translateZ(42px)' }}
                        className="my-auto text-center bg-blue-600/15 border border-blue-400/30 rounded-xl py-2"
                      >
                        <div className="text-[10px] uppercase tracking-widest text-blue-300">
                          Cámara Fría #01
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {chamberTemp.toFixed(1)} °C
                        </div>
                      </div>

                      <div
                        style={{ transform: 'translateZ(18px)' }}
                        className="flex justify-between text-[10px] font-mono text-stone-400"
                      >
                        <span>RELÉ: {relayActive ? 'ON' : 'OFF'}</span>
                        <span>WIFI: -42dBm</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-stone-400 flex items-center gap-1">
                          <Thermometer size={14} className="text-blue-400" /> Simular Temperatura:
                        </span>
                        <span className="font-bold text-white">{chamberTemp.toFixed(1)} °C</span>
                      </div>
                      <input
                        type="range"
                        min="-5"
                        max="15"
                        step="0.5"
                        value={chamberTemp}
                        onChange={(e) => setChamberTemp(parseFloat(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>

                    <button
                      onClick={() => setRelayActive(!relayActive)}
                      className={`rounded-xl p-3 border text-xs font-semibold flex items-center justify-between transition-colors ${
                        relayActive
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-stone-400'
                      }`}
                    >
                      <span>Compresor / Actuador Físico</span>
                      <span className="px-2.5 py-1 rounded-lg bg-black/40 font-mono">
                        {relayActive ? 'ACTIVO' : 'APAGADO'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* MODO 3: ARQUITECTURA CLOUD MULTISUCURSAL */}
              {activeLabTab === 'cloud' && (
                <div className="p-5 sm:p-6 bg-[#FAF9F6] space-y-4">
                  <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-2">
                        <Wifi size={15} className="text-blue-600" /> Sincronización en Tiempo Real (&lt;50ms)
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Supabase Realtime Activo
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Cada venta registrada en el mostrador o cada lectura de un sensor Kyros se replica al instante en tu teléfono móvil sin necesidad de servidores locales costosos.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                        <div className="text-sm font-bold text-stone-950">Sucursal 01</div>
                        <div className="text-[11px] text-emerald-600 font-medium">Sincronizado</div>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                        <div className="text-sm font-bold text-blue-700">Nube Central</div>
                        <div className="text-[11px] text-blue-600 font-medium">Respaldo 24/7</div>
                      </div>
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                        <div className="text-sm font-bold text-stone-950">Tu Celular</div>
                        <div className="text-[11px] text-emerald-600 font-medium">En Vivo</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRECIOS CON EFECTO 3D TILT AL CURSOR */}
      <section id="precios" className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 block mb-2">
              PRECIOS CLAROS Y COMPETITIVOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-950">
              Elige el plan ideal para tu negocio
            </h2>
          </div>
          <div className="lg:col-span-5 text-xs sm:text-sm text-stone-600 space-y-2">
            <p>
              Precios en Pesos Mexicanos (MXN) por licencia de software. Puedes usar tus propios dispositivos actuales sin obligación de comprar equipo.
            </p>
          </div>
        </div>

        <div className="mb-10 inline-flex bg-white border border-stone-200/90 p-1 rounded-full shadow-sm">
          <button
            onClick={() => setBillingPeriod('mensual')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors ${
              billingPeriod === 'mensual'
                ? 'bg-stone-950 text-white'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            Pago Mensual
          </button>
          <button
            onClick={() => setBillingPeriod('anual')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors ${
              billingPeriod === 'anual'
                ? 'bg-stone-950 text-white'
                : 'text-stone-600 hover:text-stone-950'
            }`}
          >
            Pago Anual (Ahorra 16%)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingPlans.map((plan, index) => {
            const displayedPrice =
              billingPeriod === 'mensual' ? plan.monthlyPrice : plan.annualPrice;

            return (
              <TiltSpotlightCard
                key={index}
                dark={plan.featured}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between ${
                  plan.featured
                    ? 'bg-[#0B0F14] text-white ring-1 ring-white/15 shadow-[0_24px_48px_-12px_rgba(11,15,20,0.45)]'
                    : 'bg-white text-stone-900 border border-stone-200/90 shadow-sm'
                }`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="pb-4 mb-4 border-b border-current/10">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider opacity-70 mb-2">
                        <span>CAPACIDAD</span>
                        <span className="font-semibold">{plan.capacityLabel}</span>
                      </div>
                      <div className="grid grid-cols-6 gap-1.5 items-end h-6">
                        {[1, 2, 3, 4, 5, 6].map((bar) => (
                          <div
                            key={bar}
                            style={{ height: `${Math.min(100, bar * 16 + 15)}%` }}
                            className={`rounded-sm transition-colors ${
                              bar <= plan.bars
                                ? plan.featured
                                  ? 'bg-white'
                                  : 'bg-stone-900'
                                : plan.featured
                                ? 'bg-white/15'
                                : 'bg-stone-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      {plan.featured && (
                        <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                          Más Popular
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider block mt-0.5 ${
                        plan.featured ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      {plan.subtitle}
                    </span>

                    <p
                      className={`text-xs mt-3 leading-relaxed ${
                        plan.featured ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {plan.description}
                    </p>

                    <div
                      className={`mt-5 p-4 rounded-xl border ${
                        plan.featured
                          ? 'bg-white/5 border-white/10'
                          : 'bg-[#FAF9F6] border-stone-200/80'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider opacity-60 block">
                        PRECIO DEL PLAN
                      </span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xs font-bold">$</span>
                        <span className="text-3xl font-bold tracking-tight">
                          {displayedPrice}
                        </span>
                        <span className="text-xs opacity-70">MXN</span>
                      </div>
                      <span className="text-[11px] opacity-60 block mt-0.5">{plan.unit}</span>
                    </div>

                    <ul className="space-y-3 my-6 text-xs">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check
                            size={14}
                            className={`mt-0.5 shrink-0 ${
                              plan.featured ? 'text-blue-400' : 'text-blue-600'
                            }`}
                          />
                          <span className={plan.featured ? 'text-stone-200' : 'text-stone-600'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/5216878761208?text=${encodeURIComponent(
                      `Hola Kbto Labs, me interesa contratar el plan ${plan.name} (${plan.subtitle}) de $${displayedPrice} MXN.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-3 px-5 rounded-full font-semibold text-xs text-center transition-colors block ${
                      plan.featured
                        ? 'bg-white text-stone-950 hover:bg-blue-50'
                        : 'bg-stone-950 text-white hover:bg-blue-600'
                    }`}
                  >
                    {plan.ctaText}
                  </a>
                </div>
              </TiltSpotlightCard>
            );
          })}
        </div>
      </section>

      {/* CONFIGURADOR DE 4 PASOS */}
      <section
        id="diagnostico"
        className="scroll-mt-20 py-16 px-4 sm:px-8 bg-white border-y border-stone-200/80"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-[11px] font-bold uppercase">
              <Sliders size={13} /> Configurador Inteligente
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-stone-950 mt-2">
              Descubre qué plan se adapta a tu operación
            </h2>
          </div>

          <div className="bg-[#FAF9F6] border border-stone-200/90 rounded-2xl p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-stone-950 px-3 py-1 rounded-md">
                  {step < 4 ? questions[step].stepLabel : 'DIAGNÓSTICO COMPLETADO'}
                </span>
                {step > 0 && step < 4 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-xs font-semibold text-stone-500 hover:text-stone-950 underline"
                  >
                    Paso anterior
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2 w-full sm:w-56">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-colors ${
                      step > idx
                        ? 'bg-blue-600'
                        : step === idx
                        ? 'bg-blue-400'
                        : 'bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {step < questions.length ? (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-950 mb-1">
                  {questions[step].title}
                </h3>
                <p className="text-xs text-stone-500 mb-5">{questions[step].subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(questions[step].id, opt.value)}
                      className="text-left bg-white hover:border-blue-600 border border-stone-200/90 rounded-xl p-4 transition-colors group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {opt.tag}
                          </span>
                          <ChevronRight
                            size={16}
                            className="text-stone-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform"
                          />
                        </div>
                        <div className="font-bold text-stone-950 text-sm mb-1">{opt.label}</div>
                        <p className="text-xs text-stone-500 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold">
                    <ShieldCheck size={15} /> {recommendation.badge}
                  </span>
                  <div className="bg-white border border-stone-200 px-4 py-1.5 rounded-full">
                    <span className="text-xs text-stone-500 mr-1.5">Tarifa de Software:</span>
                    <span className="text-sm font-bold text-blue-600">{recommendation.price}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-stone-950">{recommendation.name}</h3>
                  <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                    {recommendation.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="bg-white border border-stone-200 rounded-xl p-4">
                    <span className="text-xs font-bold uppercase text-blue-600 block mb-1">
                      Consideración sobre Equipo Físico
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {recommendation.hwNote}
                    </p>
                  </div>
                  <div className="bg-white border border-stone-200 rounded-xl p-4">
                    <span className="text-xs font-bold uppercase text-emerald-700 block mb-1">
                      Beneficio Operativo Directo
                    </span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {recommendation.benefit}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/5216878761208?text=${encodeURIComponent(
                      `Hola Kbto Labs, realicé el diagnóstico en su web. Mi resultado fue: ${recommendation.name} (${recommendation.price}). Giro: ${answers.industry}, Escala: ${answers.scale}, Equipo: ${answers.hardware}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-full text-xs sm:text-sm text-center flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} /> Solicitar Demostración por WhatsApp
                  </a>
                  <button
                    onClick={resetWizard}
                    className="py-3.5 px-5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={14} /> Reiniciar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SOLUCIONES ASIMÉTRICAS CON MICROINTERACCIONES */}
      <section id="soluciones" className="scroll-mt-20 py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 block mb-2">
            DIVISIONES DE INGENIERÍA
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-stone-950">
            Qué incluye cada solución de Kbto Labs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <TiltSpotlightCard className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <Monitor size={20} />
            </div>
            <h3 className="text-xl font-bold text-stone-950 mb-2">
              Sistemas Punto de Venta (POS)
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              Diseñado para que cualquier cajero o encargado cobre en segundos sin errores matemáticos al cerrar el turno.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 border-t border-stone-200/80 pt-5 mb-6">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-blue-600 shrink-0" />
                <span>Cortes de caja y arqueo de efectivo</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-blue-600 shrink-0" />
                <span>Pagos en efectivo, tarjeta y transferencia</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-blue-600 shrink-0" />
                <span>Reparto automatizado de propinas por horas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-blue-600 shrink-0" />
                <span>Impresión de tickets térmicos de venta</span>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveLabTab('pos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              Probar simulador POS arriba <ArrowUpRight size={14} />
            </button>
          </TiltSpotlightCard>

          <TiltSpotlightCard className="lg:col-span-5 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center mb-5">
              <Cpu size={20} />
            </div>
            <h3 className="text-xl font-bold text-stone-950 mb-2">
              Automatización y Telemetría IoT
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              Integramos sensores industriales a una plataforma web para supervisar variables físicas de tu negocio en tiempo real.
            </p>
            <ul className="space-y-2.5 text-xs text-stone-700 border-t border-stone-200/80 pt-5 mb-6">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-600 shrink-0" />
                <span>Vigilancia de temperatura en refrigeración</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-600 shrink-0" />
                <span>Diseño de circuitos ESP32 y gabinetes 3D</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-600 shrink-0" />
                <span>Alertas inmediatas ante fallos eléctricos</span>
              </li>
            </ul>
            <button
              onClick={() => {
                setActiveLabTab('iot3d');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              Interactuar con el modelo 3D IoT <ArrowUpRight size={14} />
            </button>
          </TiltSpotlightCard>

          <TiltSpotlightCard className="lg:col-span-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center mb-4">
                  <Globe size={20} />
                </div>
                <h3 className="text-xl font-bold text-stone-950 mb-2">
                  Desarrollo Web y Sistemas Cloud a Medida
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Construimos aplicaciones web rápidas y personalizadas para empresas, congresos u organizaciones que requieren flujos únicos.
                </p>
              </div>
              <div className="lg:col-span-6 lg:border-l border-stone-200/80 lg:pl-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-blue-600 shrink-0" />
                  <span>Plataformas interactivas para eventos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-blue-600 shrink-0" />
                  <span>Sistemas administrativos propios</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-blue-600 shrink-0" />
                  <span>Sitios corporativos enfocados en ventas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-blue-600 shrink-0" />
                  <span>Adaptación impecable a celulares</span>
                </div>
              </div>
            </div>
          </TiltSpotlightCard>
        </div>
      </section>

      {/* DOCK FLOTANTE NO LINEAL (SIN ASISTENTE IA) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-stone-950/90 backdrop-blur-md text-white px-3 py-2 rounded-full shadow-2xl border border-white/15 flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => {
            setActiveLabTab('pos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-3.5 py-1.5 rounded-full text-[11px] font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          <Store size={13} className="text-blue-400" />
          Simulador POS
        </button>
        <button
          onClick={() => {
            setActiveLabTab('iot3d');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-3.5 py-1.5 rounded-full text-[11px] font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          <Box size={13} className="text-emerald-400" />
          Nodo 3D
        </button>
        <a
          href="#precios"
          className="px-3.5 py-1.5 rounded-full text-[11px] font-medium hover:bg-white/10 transition-colors"
        >
          Precios
        </a>
        <a
          href="#diagnostico"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-[11px] font-semibold transition-colors"
        >
          Configurar Plan
        </a>
      </div>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-white border-t border-stone-200/80 py-10 px-4 sm:px-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-stone-950 flex items-center justify-center text-white font-bold text-xs">
              K
            </div>
            <span className="font-bold text-stone-950">KBTO LABS</span>
            <span className="text-stone-400">| Software, POS & Hardware</span>
          </div>
          <div>© 2026 Kbto Labs. Guasave, Sinaloa, México. Todos los derechos reservados.</div>
        </div>
      </footer>
    </main>
  );
}