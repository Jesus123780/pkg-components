import React, { useState } from 'react'
import GridLayout, { type Layout } from 'react-grid-layout'

const initialLayout: Layout[] = [
  { i: 'a', x: 0, y: 0, w: 4, h: 4 },
  { i: 'b', x: 4, y: 0, w: 4, h: 4 },
  { i: 'c', x: 0, y: 4, w: 8, h: 4 }
]

export const DashboardLayoutBuilder: React.FC = () => {
  const [layout, setLayout] = useState<Layout[]>(initialLayout)

  return (
    <div style={{ background: '#f4f6f8', minHeight: '100vh', padding: '32px' }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={8}
        rowHeight={40}
        width={1000}
        margin={[16, 16]}
        isDraggable={true}
        isResizable={true}
        useCSSTransforms={true}
        draggableHandle=".widget-header"
        onLayoutChange={setLayout}
      >
        <div key="a" style={{
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div className="widget-header" style={{
            cursor: 'move',
            padding: '8px 12px',
            fontWeight: 'bold',
            borderBottom: '1px solid #eee'
          }}>Widget A</div>
          <div style={{ padding: '12px' }}>Contenido editable A</div>
        </div>
        <div key="b" style={{
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div className="widget-header" style={{
            cursor: 'move',
            padding: '8px 12px',
            fontWeight: 'bold',
            borderBottom: '1px solid #eee'
          }}>Widget B</div>
          <div style={{ padding: '12px' }}>Contenido editable B</div>
        </div>
        <div key="c" style={{
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div className="widget-header" style={{
            cursor: 'move',
            padding: '8px 12px',
            fontWeight: 'bold',
            borderBottom: '1px solid #eee'
          }}>Widget C</div>
          <div style={{ padding: '12px' }}>Contenido editable C</div>
        </div>
      </GridLayout>
      {/* Botón para agregar widgets */}
      <button
        style={{
          marginTop: 24,
          padding: '8px 16px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
        onClick={() => {
          // Encuentra la mayor posición 'y' y suma la altura para colocar el nuevo widget debajo
          const maxY = layout.reduce((max, item) => Math.max(max, item.y + item.h), 0)
          setLayout([
            ...layout,
            { i: `new${layout.length}`, x: 0, y: maxY, w: 4, h: 4 }
          ])
        }}
      >
        + Agregar widget
      </button>
    </div>
  )
}
