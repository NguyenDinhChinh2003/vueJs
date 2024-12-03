<template>
    <div>
        <h2>Edit</h2>
        <form @submit.prevent>
            <div class="mt-3">
                <input class="form-control" type="text" v-model="project.id" hidden />
            </div>
            <div class="mb-3">
                <span class="form-label">Title:</span>
                <input type="text" class="form-control" placeholder="Enter of title" v-model="project.title">
            </div>
            <div class="mb-3">
                <span class="form-label">Description:</span>
                <textarea class="form-control" placeholder="Enter of description"
                    v-model="project.description"></textarea>
            </div>
            <div class="mb-3">
                <span class="form-label">Start Date:</span>
                <input type="date" class="form-control" placeholder="Enter of start date"
                    v-model.date="project.startDate">
            </div>
            <div class="mb-3">
                <span class="form-label">End Date:</span>
                <input type="date" class="form-control  " placeholder="Enter of end date" v-model="project.endDate">
            </div>
            <button class="btn btn-success" @click="updateProject">Update</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import instanceAxios from "@/ultis/configAxios";
import { useRoute, useRouter } from "vue-router"

const project = ref({
    id: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
});
const route = useRoute();
const router = useRouter();
const selectedId = ref();

const checkValidate = () => {
    if (!project.value.title || !project.value.description ||
    !project.value.startDate || !project.value.endDate) {
        alert("Yêu cầu bắt buộc nhập tất cả các trường");
        return false;
    }else if(project.value.startDate > project.value.endDate){
        alert("Ngay bat dau khong dc lon hon ngay ket thuc");
        return false;
    }
    return true;
};

const getDetail = async () => {
    const response = await instanceAxios.get(`projects/${selectedId.value}`)
    if (response) {
        project.value = response.data;
    }
}

const updateProject = async () => {
    if (!checkValidate()) return;
    const response = await instanceAxios.put(`projects/${selectedId.value}`, project.value);
    console.log(response)
    if(response && response.status === 200) {
        alert("Update successfully")
        router.push({name: 'list'})
    }
}

onMounted(() => {
    if (route && route.params) {
        selectedId.value = route.params.id;
        getDetail();
    }
})
</script>