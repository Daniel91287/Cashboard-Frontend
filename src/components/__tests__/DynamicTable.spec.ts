import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import DynamicTable from '@/components/DynamicTable.vue'
import type { Transaction } from '@/types'
import axios, {type AxiosRequestConfig} from 'axios'

const getAccessTokenSilentlyMock = vi.fn<() => Promise<string>>()

vi.mock('axios')
vi.mock('@auth0/auth0-vue', () => {
  return {
    useAuth0: () => ({
      getAccessTokenSilently: getAccessTokenSilentlyMock
    })
  }
})

describe('DynamicTable (Auth0 gemockt)', () => {
  const items: Transaction[] = [
    { id: 1, description: 'Miete', amount: -750, date: new Date('2025-01-02') },
    { id: 2, description: 'Gehalt', amount: 3200, date: new Date('2025-01-03') }
  ]

  const deleteTransaction = vi.fn(async () => {})
  const loadTransaction = vi.fn(async () => {})

  beforeEach(() => {
    vi.clearAllMocks()
    getAccessTokenSilentlyMock.mockResolvedValue('fake-access-token')
  })

  it('zeigt die übergebenen Einträge an', () => {
    const wrapper = shallowMount(DynamicTable, {
      props: { items, deleteTransaction, loadTransaction }
    })

    expect(wrapper.text()).toContain('Deine Umsatzübersicht')
    expect(wrapper.text()).toContain('Miete')
    expect(wrapper.text()).toContain('Gehalt')
  })

  it('filtert Einträge nach Beschreibung', async () => {
    const wrapper = shallowMount(DynamicTable, {
      props: { items, deleteTransaction, loadTransaction }
    })

    await wrapper.find('#descriptionFilter').setValue('miet')

    expect(wrapper.text()).toContain('Miete')
    expect(wrapper.text()).not.toContain('Gehalt')
  })

  it('verwendet ein gemocktes Auth0-Token beim Aktualisieren einer Transaktion', async () => {
    vi.mocked(axios, true).put.mockResolvedValueOnce({ data: {} })

    const wrapper = shallowMount(DynamicTable, {
      props: { items, deleteTransaction, loadTransaction }
    })

    // Bearbeitung der ersten Zeile starten
    await wrapper.find('button.editButton').trigger('click')

    // Werte ändern
    await wrapper.find('input.table-input').setValue('Miete (korrigiert)')
    const numberInputs = wrapper.findAll('input[type="number"]')
    const numberInput = numberInputs.at(0)
    if (numberInput) {
      await numberInput.setValue('-700')
    }
    const dateInputs = wrapper.findAll('input[type="date"]')
    const dateInput = dateInputs.at(0)
    if (dateInput) {
      await dateInput.setValue('2025-01-05')
    }

    // Speichern
    await wrapper.find('button.saveButton').trigger('click')
    await flushPromises()

    expect(getAccessTokenSilentlyMock).toHaveBeenCalled()

    expect(vi.mocked(axios, true).put).toHaveBeenCalledTimes(1)
    const call = vi.mocked(axios, true).put.mock.calls[0]
    const config = call?.[2] as AxiosRequestConfig | undefined

    expect(config).toBeTruthy()
    expect(config?.headers).toBeTruthy()
    expect(config?.headers?.Authorization).toBe('Bearer fake-access-token')

    expect(loadTransaction).toHaveBeenCalled()
  })

  it('ruft getAccessTokenSilently nicht beim initialen Rendern auf', () => {
    shallowMount(DynamicTable, {
      props: { items, deleteTransaction, loadTransaction }
    })

    expect(getAccessTokenSilentlyMock).not.toHaveBeenCalled()
  })

  it('setzt den Beschreibungsfilter zurück und zeigt wieder alle Einträge', async () => {
    const wrapper = shallowMount(DynamicTable, {
      props: { items, deleteTransaction, loadTransaction }
    })

    await wrapper.find('#descriptionFilter').setValue('miet')
    expect(wrapper.text()).toContain('Miete')
    expect(wrapper.text()).not.toContain('Gehalt')

    await wrapper.find('#descriptionFilter').setValue('')
    expect(wrapper.text()).toContain('Miete')
    expect(wrapper.text()).toContain('Gehalt')
  })

})
