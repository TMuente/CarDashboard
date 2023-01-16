<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Eintrag hinzufügen</button>

  <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Eintrag hinzufügen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form ref="form">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" aria-describedby="name" required/>
              <div id="name" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Preis</label>
              <input type="number" step="0.01" class="form-control" id="price" aria-describedby="price" required/>
              <div id="name" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="date" class="form-label">Datum</label>
              <input type="date" class="form-control" id="date" aria-describedby="date" required/>
              <div id="date" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="km" class="form-label">Kilometer</label>
              <input type="number" class="form-control" id="km" aria-describedby="km" required/>
              <div id="km" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="invoice" class="form-label">Rechnung</label>
              <input type="file" class="form-control" id="invoice" aria-describedby="invoice" />
              <div id="invoice" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <button type="submit" class="btn btn-primary">Senden</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useMainStore } from '@/stores/carStore'
import { computed, onMounted, ref } from 'vue'
import { directus } from '@/services/directus'

export default {
  name: 'ButtonAddItem',

  setup() {
    const mainStore = useMainStore()
    const items = directus.items('repair')
    const form = ref('')
    const modal = ref('')
    const myModal = ref('')

    async function addData(event) {
      event.preventDefault()
      try {
        await items.createOne({
          status: 'published',
          name: this[0].value,
          price: this[1].value,
          date: this[2].value,
          km: this[3].value
        })
        if (this[4].value.length > 0) {
          await directus.files.createOne({
            title: this[0].value.replace(' ', '_') + '_' + this[2].value,
            file: this[4].value,
            storage: 'local',
            filename_download: this[0].value.replace(' ', '_') + '_' + this[2].value,
            type: 'application/pdf'
          })
        }
        console.log('Items created')
      } catch (error) {
        console.log(error)
      } finally {
        mainStore.fetchData()
        myModal.value.hide()
        form.value.reset()
      }
    }

    onMounted(() => {
      form.value.addEventListener('submit', addData)
      myModal.value = new bootstrap.Modal(modal.value, {})
    })

    return { mainStore, items, form, modal, myModal, addData }
  }
}
</script>

<style lang="scss"></style>
