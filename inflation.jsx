import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Brush } from 'recharts';

const InflacionInteractiva = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [highlightDeflation, setHighlightDeflation] = useState(false);
  const [showBrush, setShowBrush] = useState(true);

  // Datos de inflación mensual con hitos económicos detallados y cotización dólar cripto
  const data = [
    { fecha: 'Feb 2023', pesos: 6.6, dolarCripto: 4.0, mes: 'Febrero 2023', cotizacionCripto: 385,
      evento: 'Gobierno Massa', 
      hitos: ['Crisis energética profunda', 'Escasez de gas', 'Inflación descontrolada', 'Brecha cambiaria 90%'] },
    { fecha: 'Mar 2023', pesos: 7.7, dolarCripto: 4.8, mes: 'Marzo 2023', cotizacionCripto: 395,
      evento: 'Crisis energética', 
      hitos: ['Sequía histórica record', 'Pérdida de cosecha soja/maíz', 'Menor ingreso de divisas', 'Racionamiento energético'] },
    { fecha: 'Abr 2023', pesos: 8.4, dolarCripto: 3.2, mes: 'Abril 2023', cotizacionCripto: 415,
      evento: 'Sequía histórica', 
      hitos: ['Caída exportaciones agrícolas', 'Revisión acuerdo FMI', 'Presión sobre reservas BCRA', 'Suba tarifas'] },
    { fecha: 'May 2023', pesos: 7.8, dolarCripto: -5.2, mes: 'Mayo 2023', cotizacionCripto: 445,
      evento: 'Volatilidad cambiaria', 
      hitos: ['Dólar soja especial', 'Intervención BCRA', 'Controles de precios', 'Pre-campaña electoral'] },
    { fecha: 'Jun 2023', pesos: 6.0, dolarCripto: 5.4, mes: 'Junio 2023', cotizacionCripto: 475,
      evento: 'Pre-elecciones', 
      hitos: ['Aceleración campaña electoral', 'Promesas económicas', 'Incertidumbre política', 'Fuga de capitales'] },
    { fecha: 'Jul 2023', pesos: 6.3, dolarCripto: 4.1, mes: 'Julio 2023', cotizacionCripto: 510,
      evento: 'Campaña electoral', 
      hitos: ['Debate sobre dolarización', 'Propuestas Milei vs Massa', 'Tensión en mercados', 'Especulación cambiaria'] },
    { fecha: 'Ago 2023', pesos: 12.4, dolarCripto: -4.2, mes: 'Agosto 2023', cotizacionCripto: 570,
      evento: 'Post-PASO', 
      hitos: ['Milei gana PASO inesperadamente', 'Devaluación 22% de Massa', 'Pánico en mercados', 'Suba tasas BCRA'] },
    { fecha: 'Sep 2023', pesos: 12.7, dolarCripto: 1.2, mes: 'Septiembre 2023', cotizacionCripto: 640,
      evento: 'Incertidumbre', 
      hitos: ['Polarización electoral extrema', 'Corrida al dólar', 'Retiro masivo de depósitos', 'Crisis de confianza'] },
    { fecha: 'Oct 2023', pesos: 8.3, dolarCripto: -5.8, mes: 'Octubre 2023', cotizacionCripto: 740,
      evento: 'Elecciones generales', 
      hitos: ['Balotaje Milei vs Massa', 'Promesas dolarización', 'Incertidumbre institucional', 'Reservas BCRA negativas'] },
    { fecha: 'Nov 2023', pesos: 12.8, dolarCripto: 0.2, mes: 'Noviembre 2023', cotizacionCripto: 840,
      evento: 'Transición', 
      hitos: ['Milei presidente electo', 'Equipo económico Caputo', 'Expectativa devaluación', 'Agotamiento reservas'] },
    { fecha: 'Dic 2023', pesos: 25.5, dolarCripto: 7.2, mes: 'Diciembre 2023', cotizacionCripto: 990,
      evento: '🔥 DEVALUACIÓN MILEI', 
      hitos: ['Devaluación 118% (370→830)', 'DNU de desregulación', 'Ley Ómnibus al Congreso', 'Eliminación subsidios'] },
    { fecha: 'Ene 2024', pesos: 20.6, dolarCripto: 10.2, mes: 'Enero 2024', cotizacionCripto: 1090,
      evento: 'Shock inicial', 
      hitos: ['Recesión técnica', 'Ajuste tarifario brutal', 'Caída consumo -15%', 'Aumento pobreza'] },
    { fecha: 'Feb 2024', pesos: 13.2, dolarCripto: 17.8, mes: 'Febrero 2024', cotizacionCripto: 1040,
      evento: 'Ley Ómnibus', 
      hitos: ['Debate Ley Ómnibus', 'Protestas sociales', 'Rechazo inicial Diputados', 'Tensión política máxima'] },
    { fecha: 'Mar 2024', pesos: 11.0, dolarCripto: 15.9, mes: 'Marzo 2024', cotizacionCripto: 990,
      evento: 'Ajuste fiscal', 
      hitos: ['Primer superávit fiscal en años', 'Despidos estado masivos', 'Cierre organismos públicos', 'Ley Bases aprobada'] },
    { fecha: 'Abr 2024', pesos: 8.8, dolarCripto: 4.2, mes: 'Abril 2024', cotizacionCripto: 1040,
      evento: 'Estabilización', 
      hitos: ['Inflación single digit', 'Estabilización FX', 'Recuperación reservas leve', 'Confianza mercados'] },
    { fecha: 'May 2024', pesos: 4.2, dolarCripto: -0.3, mes: 'Mayo 2024', cotizacionCripto: 1090,
      evento: 'Ancla monetaria', 
      hitos: ['Primera deflación en USD', 'Blanqueo de capitales', 'RIGI para inversiones', 'Meta inflación 2%'] },
    { fecha: 'Jun 2024', pesos: 4.6, dolarCripto: -3.2, mes: 'Junio 2024', cotizacionCripto: 1180,
      evento: 'Superávit fiscal', 
      hitos: ['Superávit fiscal histórico', 'Acumulación reservas', 'Caída riesgo país', 'Negociación FMI'] },
    { fecha: 'Jul 2024', pesos: 4.0, dolarCripto: -10.2, mes: 'Julio 2024', cotizacionCripto: 1380,
      evento: 'Desaceleración', 
      hitos: ['Brecha cambiaria máxima 47%', 'Presión sobre cripto', 'Dólar blend exportadores', 'Intervención BCRA'] },
    { fecha: 'Ago 2024', pesos: 4.2, dolarCripto: 7.5, mes: 'Agosto 2024', cotizacionCripto: 1330,
      evento: 'Volatilidad cripto', 
      hitos: ['Tensión por elecciones EEUU', 'Especulación financiera', 'Ley Bases sancionada', 'RIGI reglamentado'] },
    { fecha: 'Sep 2024', pesos: 3.5, dolarCripto: 10.8, mes: 'Septiembre 2024', cotizacionCripto: 1240,
      evento: 'Repunte cripto', 
      hitos: ['Máximo cripto del año $1.380', 'Presión devaluatoria', 'Debate timing salida cepo', 'Veto universitario'] },
    { fecha: 'Oct 2024', pesos: 2.7, dolarCripto: 6.5, mes: 'Octubre 2024', cotizacionCripto: 1190,
      evento: 'Consolidación', 
      hitos: ['Inflación núcleo 2.4%', 'Actividad económica +3.9%', 'Signos recuperación', 'Confianza empresaria'] },
    { fecha: 'Nov 2024', pesos: 2.4, dolarCripto: 6.8, mes: 'Noviembre 2024', cotizacionCripto: 1140,
      evento: 'Expectativas', 
      hitos: ['Trump gana EEUU', 'Optimismo mercados', 'Blanqueo récord USD 20.000M', 'Proyección salida cepo'] },
    { fecha: 'Dic 2024', pesos: 2.7, dolarCripto: -1.2, mes: 'Diciembre 2024', cotizacionCripto: 1090,
      evento: 'Convergencia', 
      hitos: ['Brecha cambiaria 6%', 'Convergencia tipos cambio', 'Balance fiscal positivo', 'Preparación salida cepo'] },
    { fecha: 'Ene 2025', pesos: 2.2, dolarCripto: 3.8, mes: 'Enero 2025', cotizacionCripto: 1070,
      evento: 'Continuidad', 
      hitos: ['Inflación 2.2% récord', 'Discurso Davos de Milei', 'Negociación FMI avanzada', 'Reservas netas positivas'] },
    { fecha: 'Feb 2025', pesos: 2.6, dolarCripto: 3.2, mes: 'Febrero 2025', cotizacionCripto: 1060,
      evento: 'Estabilidad', 
      hitos: ['Actividad económica +2.1%', 'Consumo recuperándose', 'Pre-acuerdo FMI USD 20.000M', 'Salarios vs inflación'] },
    { fecha: 'Mar 2025', pesos: 3.7, dolarCripto: 4.3, mes: 'Marzo 2025', cotizacionCripto: 1050,
      evento: 'Repunte estacional', 
      hitos: ['Inflación escolar/estacional', 'Paritarias 2025', 'Debate salario mínimo', 'Tensión pre-cepo'] },
    { fecha: 'Abr 2025', pesos: 2.8, dolarCripto: 3.5, mes: 'Abril 2025', cotizacionCripto: 1040,
      evento: '🚀 FIN DEL CEPO', 
      hitos: ['14 abril: FIN DEL CEPO', 'Flotación USD 1000-1400', 'Acuerdo FMI USD 20.000M', 'Fase 3 programa económico'] },
    { fecha: 'May 2025', pesos: 1.8, dolarCripto: -2.1, mes: 'Mayo 2025', cotizacionCripto: 1080,
      evento: '⭐ DEFLACIÓN EN USD', 
      hitos: ['Inflación 1.8% mínimo 5 años', 'Deflación USD primera vez', 'Convergencia total FX', 'Éxito liberalización'] }
  ];

  const getFilteredData = () => {
    switch(selectedPeriod) {
      case '2023':
        return data.filter(d => d.fecha.includes('2023'));
      case '2024':
        return data.filter(d => d.fecha.includes('2024'));
      case '2025':
        return data.filter(d => d.fecha.includes('2025'));
      case 'milei':
        return data.filter(d => 
          new Date(`${d.fecha.split(' ')[1]}-${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(d.fecha.split(' ')[0].substring(0,3)) + 1}-01`) >= new Date('2023-12-01')
        );
      default:
        return data;
    }
  };

  const filteredData = getFilteredData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = data.find(d => d.fecha === label);
      return (
        <div className="bg-white p-4 border rounded-lg shadow-xl max-w-sm">
          <p className="font-bold text-gray-800 mb-3 text-lg">{label}</p>
          
          {/* Cotización del dólar cripto */}
          {dataPoint && (
            <div className="bg-green-50 border border-green-200 rounded p-2 mb-3">
              <p className="text-sm font-semibold text-green-800">
                ⚡ Dólar Cripto: <span className="text-lg">${dataPoint.cotizacionCripto}</span>
              </p>
            </div>
          )}

          {/* Datos de inflación */}
          <div className="space-y-2 mb-3">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded mr-2" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm">
                  <strong>{entry.name}:</strong> {entry.value.toFixed(1)}%
                  {entry.value < 0 && <span className="text-red-600 font-semibold"> (deflación)</span>}
                </span>
              </div>
            ))}
          </div>

          {/* Contexto económico */}
          {dataPoint && (
            <>
              <div className="border-t pt-3 mb-3">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  📊 {dataPoint.evento}
                </p>
              </div>
              
              {/* Hitos económicos detallados */}
              <div className="border-t pt-2">
                <p className="text-xs font-semibold text-gray-600 mb-2">🎯 Hitos del mes:</p>
                <ul className="text-xs text-gray-600 space-y-1 max-h-24 overflow-y-auto">
                  {dataPoint.hitos?.map((hito, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-1">•</span>
                      <span>{hito}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value) => {
    return `${value}%`;
  };

  const getDeflationPoints = () => {
    return data.filter(d => d.dolarCripto < 0).map(d => d.fecha);
  };

  const deflationPoints = getDeflationPoints();

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (highlightDeflation && payload.dolarCripto < 0) {
      return (
        <circle 
          cx={cx} 
          cy={cy} 
          r={6} 
          fill="#ef4444" 
          stroke="#fff" 
          strokeWidth={2}
          className="animate-pulse"
        />
      );
    }
    return null;
  };

  return (
    <div className="w-full p-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white rounded-xl shadow-2xl p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Inflación Mensual: Pesos vs Dólar Cripto 
          </h2>
          <p className="text-gray-600 mb-6">
            Comparación interactiva usando dólar cripto (más líquido, 24/7, precio real)
          </p>
          
          {/* Controles interactivos */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPeriod('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === 'all' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todo el período
              </button>
              <button
                onClick={() => setSelectedPeriod('2023')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === '2023' 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Solo 2023
              </button>
              <button
                onClick={() => setSelectedPeriod('2024')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === '2024' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Solo 2024
              </button>
              <button
                onClick={() => setSelectedPeriod('2025')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === '2025' 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Solo 2025
              </button>
              <button
                onClick={() => setSelectedPeriod('milei')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === 'milei' 
                    ? 'bg-yellow-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Era Milei
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setHighlightDeflation(!highlightDeflation)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  highlightDeflation 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {highlightDeflation ? '🔴 Deflaciones marcadas' : 'Marcar deflaciones'}
              </button>
              <button
                onClick={() => setShowBrush(!showBrush)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showBrush 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showBrush ? '📊 Zoom ON' : 'Activar zoom'}
              </button>
            </div>
          </div>

          {/* Estadísticas destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800">Mayo 2025 - Pesos</h3>
              <p className="text-2xl font-bold text-blue-600">+1.8%</p>
              <p className="text-sm text-blue-600">Mínimo en 5 años</p>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800">Mayo 2025 - Dólar Cripto</h3>
              <p className="text-2xl font-bold text-red-600">-2.1%</p>
              <p className="text-sm text-red-600">🎉 DEFLACIÓN histórica</p>
            </div>
          </div>

          {highlightDeflation && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-red-800 mb-2">🔍 Meses con Deflación en Dólar Cripto</h3>
              <p className="text-sm text-red-700">
                Meses donde el costo de vida bajó en dólares cripto (más confiable que blue por mayor liquidez)
              </p>
            </div>
          )}
        </div>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: showBrush ? 60 : 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="fecha" 
                stroke="#666"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={showBrush ? 60 : 80}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickFormatter={formatYAxis}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <ReferenceLine y={0} stroke="#000" strokeDasharray="2 2" strokeWidth={2} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Line 
                type="monotone" 
                dataKey="pesos" 
                stroke="#3b82f6" 
                strokeWidth={4}
                name="📈 Inflación en Pesos"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 3, fill: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="dolarCripto" 
                stroke="#ef4444" 
                strokeWidth={4}
                name="⚡ Inflación en Dólar Cripto"
                dot={highlightDeflation ? CustomDot : { fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8, stroke: '#ef4444', strokeWidth: 3, fill: '#fff' }}
              />
              {showBrush && (
                <Brush 
                  dataKey="fecha" 
                  height={30} 
                  stroke="#8884d8"
                  fill="#f0f0f0"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

      {/* Information Section */}
        <div className="mt-8 px-8">
          <div className="backdrop-blur-xl bg-white/50 border border-black/25 rounded-2xl shadow-lg p-6 mb-8"
               style={{ backdropFilter: 'blur(15px) saturate(150%)' }}>
            <h2 className="text-2xl font-bold text-black mb-6 tracking-tight">
              Acerca de las Mediciones y Uso del Gráfico
            </h2>
            <div className="space-y-6 text-black text-sm leading-relaxed font-medium">
              <div>
                <strong className="font-semibold text-black text-base">📈 Inflación en Pesos:</strong>
                <p className="mt-1">Representa la variación porcentual mensual de los precios de bienes y servicios en Argentina, medida en pesos argentinos (ARS). Es el indicador más comúnmente reportado de inflación en el país.</p>
              </div>
              <div>
                <strong className="font-semibold text-black text-base">📉 Inflación en Dólar Cripto:</strong>
                <p className="mt-1">Mide la variación del costo de vida en Argentina tomando como referencia el valor de una criptomoneda estable (stablecoin, como USDT o DAI) que replica al dólar estadounidense. Se calcula combinando la inflación en pesos con la fluctuación de la cotización del dólar cripto. Un valor negativo indica una "deflación en dólares", es decir, el costo de vida medido en dólares cripto disminuyó. Esta métrica es útil para analizar el poder adquisitivo en una moneda percibida como más estable, especialmente en contextos de alta devaluación del peso.</p>
              </div>

              <div>
                <strong className="font-semibold text-black text-base">🎯 Cómo Usar el Gráfico</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li><span className="font-semibold">Hover:</span> Pasa el mouse sobre los puntos del gráfico para ver detalles del mes.</li>
                  <li><span className="font-semibold">Filtros:</span> Usa los botones de período ("Todo", "2023", etc.) para enfocar el análisis en rangos de tiempo específicos.</li>
                  <li><span className="font-semibold">Zoom:</span> Si está activado ("Zoom ON"), arrastra los selectores en la barra inferior del gráfico para ampliar una sección particular.</li>
                  <li><span className="font-semibold">Deflación:</span> Activa el botón "Marcar Deflaciones" para resaltar visualmente los meses donde hubo deflación en Dólar Cripto.</li>
                </ul>
              </div>

              <div>
                <strong className="font-semibold text-black text-base">📊 Interpretación de las Líneas</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li><span className="font-semibold text-black">Línea azul (Inflación en Pesos):</span> Refleja cómo varían los precios para el ciudadano que opera principalmente en pesos.</li>
                  <li><span className="font-semibold text-black">Línea roja (Inflación en Dólar Cripto):</span> Muestra la variación de precios para quien utiliza Dólar Cripto como referencia o ahorro, ofreciendo una perspectiva ajustada por la devaluación.</li>
                  <li><span className="font-semibold">Sobre la línea 0%:</span> Indica inflación; los precios están subiendo en esa moneda de referencia.</li>
                  <li><span className="font-semibold">Bajo la línea 0%:</span> Indica deflación; los precios están bajando en esa moneda de referencia.</li>
                </ul>
              </div>
              
              <div>
                <strong className="font-semibold text-black text-base">💡 Insight Clave:</strong>
                <p className="mt-1">Por ejemplo, en Mayo 2025, mientras los precios subieron un 1.8% en pesos (inflación para el consumidor en pesos), bajaron un 2.1% en Dólar Cripto (deflación para quien usa dólar cripto como referencia). Esto significa que, en ese mes, el poder de compra del Dólar Cripto aumentó respecto a los bienes y servicios locales.</p>
              </div>

              <div>
                <strong className="font-semibold text-black text-base">🔍 Sobre el Dólar Cripto:</strong>
                <p className="mt-1">Se considera una referencia más transparente y de mercado que el "dólar blue" u otras cotizaciones informales debido a su alta liquidez, operación continua 24/7 a nivel global y menor susceptibilidad a intervenciones directas o restricciones locales. Su precio tiende a reflejar de manera más ágil la oferta y demanda real.</p>
              </div>

              <p className="text-xs text-black pt-3 italic border-t border-slate-300/50 mt-4">
                Nota: Los datos históricos, eventos y proyecciones presentados son compilaciones con fines ilustrativos y de análisis. Pueden no representar cifras oficiales exactas en todos los casos y están sujetos a interpretación.
              </p>
            </div>
          </div>
        </div>

        {/* Final Separator Line */}
        <div className="max-w-7xl mx-auto px-8">
           <hr className="my-8 border-slate-300/70" />
        </div>
        {/* Spacer at the bottom */}
        <div className="pb-12"></div>

      </div> {/* End of max-w-7xl mx-auto */}
      
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="pesosGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="dolarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="deflationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default InflacionInteractiva;