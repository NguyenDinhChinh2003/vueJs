<script setup>
import instanceAxios from '@/ultis/configAxios';

// sử dụng defineProps để kháo giá trị trong props do component cha truyền vào
const props = defineProps({
  isShowModal: Boolean,
  handleCloseModal: Function,
  selectedProject: Object
})
// định nghĩa emit trong component con
const emit = defineEmits(['confirmEmit']);

console.log(props);
const onClickDelete = async() => {
  const response = await instanceAxios.delete(`projects/${props.selectedProject.id}`)
  if (response) {
    // thông báo xóa thành công

    // đóng modal
    emit('closeModal');
    // load ra được danh sách mới
    emit('getNewList');
  }
}

</script>

<template>
  <div class="modal" style="display: block;" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Xác nhận xóa</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Bạn có muốn xóa thông tin {{ props.selectedProject.title }} không ?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="onClickDelete">Delete</button>
          <button type="button" class="btn btn-secondary" @click="handleCloseModal" data-dismiss="modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>