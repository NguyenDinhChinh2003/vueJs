<template>
    <h2>List project</h2>
    <RouterLink to="/create" class="btn btn-success">Create new</RouterLink>
    <table class="table table-tripped">
        <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="project in projects" :key="project.id">
                <td>{{ project.id }}</td>
                <td>{{ project.title }}</td>
                <td>{{ project.description }}</td>
                <td>{{ project.startDate }}</td>
                <td>{{ project.endDate }}</td>
                <td>
                    <!-- <button class="btn btn-info" @click="onClickShowDetail(hotel.id)">
              Xem
            </button> -->
                    <RouterLink :to="{ name: 'detail', params: { id: project.id } }" class="btn btn-primary me-3">view
                    </RouterLink>
                    <RouterLink :to="{ name: 'update', params: { id: project.id } }" class="btn btn-primary me-3"> update
                    </RouterLink>
                    <button class="btn btn-danger" @click="handleToggleModal(project)">
                        delete
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Nhúng Confirm Modal -->
    <ConfirmDelete 
        v-if="isShowModal"
        :selectedProject="selectedProject"
        :handleCloseModal="handleCloseModal"
        :isShowModal="isShowModal"
        @closeModal="handleCloseModal"
        @getNewList="getListProjects" 
    />
</template>
<script setup>
import { ref, onMounted } from "vue";
import instanceAxios from "@/ultis/configAxios";
import ConfirmDelete from "../modalBasic/Modal.vue";
const projects = ref();
const isShowModal = ref(false);
const selectedProject = ref({
    id: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
});
// Hàm lấy dữ liệu từ json-server đổ vào hotels
// Hàm lấy danh sách hotels
const getListProjects = async () => {
    const response = await instanceAxios.get("projects");
    console.log(response);
    if (response && response.data) {
        projects.value = response.data;
    }
};

  const handleToggleModal = async (item) => {
    isShowModal.value = true;
    selectedProject.value = await item;
  }

const handleCloseModal = () => {
    isShowModal.value = false;
}

onMounted(() => {
    getListProjects();
});
</script>