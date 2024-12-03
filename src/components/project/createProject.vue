<template>
    <div>
        <h2>Create new project</h2>
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
                <textarea class="form-control" placeholder="Enter of description" v-model="project.description"></textarea>
            </div>
            <div class="mb-3">
                <span class="form-label">Start Date:</span>
                <input type="date" class="form-control" placeholder="Enter of start date" v-model="project.startDate">
            </div>
            <div class="mb-3">
                <span class="form-label">End Date:</span>
                <input type="date" class="form-control  " placeholder="Enter of end date" v-model="project.endDate">
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-success" @click="onClickCreate">Create</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import instanceAxios from "@/ultis/configAxios";
import { useRouter } from "vue-router"

const project = ref({
    id: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
});
const route = useRouter();
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

const onClickCreate = async () => {
    if (!checkValidate()) return;
    const projects =  await instanceAxios.get('projects');
    if(projects.data.length > 0) {
        project.value.id = projects.data.length + 1 + ""
    } else {
        project.value.id = 1;
    }
    const response = await instanceAxios.post('projects', project.value);
    if (response && response.status == 201) {
        alert("Tạo mới thành công");
        route.push({name: 'list'})
    }
}
</script>