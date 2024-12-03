<template>
    <div>
        <h2>Detail</h2>
        <button class="btn btn-success" @click="toUpdate">Update</button>
        <form>
            <div class="mt-3">
                <input class="form-control" type="text" v-model="project.id" disabled />
            </div>
            <div class="mb-3">
                <span class="form-label">Title:</span>
                <input type="text" class="form-control" placeholder="Enter of title" v-model="project.title" disabled>
            </div>
            <div class="mb-3">
                <span class="form-label">Description:</span>
                <textarea class="form-control" placeholder="Enter of description" v-model="project.description"
                    disabled></textarea>
            </div>
            <div class="mb-3">
                <span class="form-label">Start Date:</span>
                <input type="date" class="form-control" placeholder="Enter of start date"
                    v-model.date="project.startDate" disabled>
            </div>
            <div class="mb-3">
                <span class="form-label">End Date:</span>
                <input type="date" class="form-control  " placeholder="Enter of end date" v-model="project.endDate"
                    disabled>
            </div>
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
const getDetail = async () => {
    const response = await instanceAxios.get(`projects/${selectedId.value}`)
    if (response) {
        project.value = response.data;
    }
}
onMounted(() => {
    if (route && route.params) {
        selectedId.value = route.params.id;
        getDetail();
    }
})
const toUpdate = () => {
    router.push({
        name: 'update',
        params: { id: selectedId.value },
    });
}
</script>