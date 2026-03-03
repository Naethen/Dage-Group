import { supabase } from './supabase'

/**
 * Submit a contact/inquiry form to Supabase.
 * Extracts all named inputs from the form element.
 * @param {HTMLFormElement} form
 * @param {string} page - page identifier (e.g. 'schools', 'city-xpress-hire')
 * @returns {{ success: boolean, error?: string }}
 */
export async function submitForm(form, page) {
  const fd = new FormData(form)
  const data = {}
  fd.forEach((value, key) => { data[key] = value })

  const row = {
    first_name: data.first_name || data.name || data.full_name || null,
    last_name: data.last_name || null,
    email: data.email || null,
    subject: data.subject || data.role || data.room_type || data.product || page,
    message: data.message || data.details || data.notes || JSON.stringify(data),
    page,
  }

  const { error } = await supabase.from('contact_submissions').insert(row)
  if (error) {
    console.error('Form submission error:', error.message)
    return { success: false, error: error.message }
  }
  return { success: true }
}
