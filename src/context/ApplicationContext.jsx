import { createContext, useContext, useReducer, useEffect } from 'react'
import { storage, generateId } from '../utils'

const ApplicationContext = createContext(null)

const initialState = {
  applications: [],
  isLoaded: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, applications: action.payload, isLoaded: true }

    case 'ADD': {
      const newApp = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return { ...state, applications: [newApp, ...state.applications] }
    }

    case 'UPDATE': {
      const updated = state.applications.map((app) =>
        app.id === action.payload.id
          ? { ...app, ...action.payload, updatedAt: new Date().toISOString() }
          : app
      )
      return { ...state, applications: updated }
    }

    case 'DELETE': {
      const filtered = state.applications.filter(
        (app) => !action.payload.includes(app.id)
      )
      return { ...state, applications: filtered }
    }

    case 'IMPORT':
      return { ...state, applications: action.payload }

    default:
      return state
  }
}

export function ApplicationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Load dari localStorage saat pertama kali
  useEffect(() => {
    const saved = storage.getAll()
    dispatch({ type: 'LOAD', payload: saved })
  }, [])

  // Sync ke localStorage setiap kali applications berubah
  useEffect(() => {
    if (state.isLoaded) {
      storage.save(state.applications)
    }
  }, [state.applications, state.isLoaded])

  const addApplication = (data) => dispatch({ type: 'ADD', payload: data })

  const updateApplication = (data) => dispatch({ type: 'UPDATE', payload: data })

  const deleteApplications = (ids) =>
    dispatch({ type: 'DELETE', payload: Array.isArray(ids) ? ids : [ids] })

  const importApplications = (data) =>
    dispatch({ type: 'IMPORT', payload: data })

  return (
    <ApplicationContext.Provider
      value={{
        applications: state.applications,
        isLoaded: state.isLoaded,
        addApplication,
        updateApplication,
        deleteApplications,
        importApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplications() {
  const ctx = useContext(ApplicationContext)
  if (!ctx) throw new Error('useApplications must be used within ApplicationProvider')
  return ctx
}
