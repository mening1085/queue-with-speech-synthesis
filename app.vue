<template>
  <div class="px-12">
    <h1 class="text-3xl font-semibold text-center my-4" @click="clear">
      จำลองระบบเรียกคิว
    </h1>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <div class="p-12 border rounded-md bg-gray-50">
          <div class="grid grid-cols-2 gap-12">
            <!-- รอซักประวัติ -->
            <div>
              <div class="border border-black overflow-hidden rounded-md">
                <h2
                  class="text-md font-medium text-center bg-gray-300 border-b border-black p-2"
                >
                  รอซักประวัติ
                </h2>
                <div class="overflow-auto h-[200px]">
                  <div
                    v-for="item in queueWaiting"
                    :key="item.id"
                    class="border-b border-black p-2"
                  >
                    <div class="text-center">{{ item.name }}</div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center mt-3">
                <button
                  class="text-[14px] px-4 py-2 bg-blue-500 text-white rounded-md"
                  @click="fetchUsers"
                >
                  เพิ่มผู้ใช้
                </button>
              </div>
            </div>

            <!-- กำลังซักประวัติ -->
            <div>
              <div class="border border-black overflow-hidden rounded-md">
                <h2
                  class="text-md font-medium text-center bg-gray-300 border-black border-b p-2"
                >
                  กำลังซักประวัติ
                </h2>
                <div class="overflow-auto h-[200px]">
                  <div
                    v-for="item in queueQuery"
                    :key="item.id"
                    class="border-black border-b p-2"
                  >
                    <div class="text-center flex justify-center">
                      {{ item.name }}
                      <button
                        class="w-[20px] h-[20px] bg-red-400 flex items-center justify-center text-white rounded-full"
                        @click="deleteQueue(item)"
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-3">
                <div class="flex">
                  <button
                    class="text-[14px] px-4 py-2 bg-orange-500 text-white rounded-md"
                    @click="changeStatus('กำลังซักประวัติ', false)"
                  >
                    เรียกคิวถัดไป
                  </button>
                  <button
                    class="text-[14px] px-4 py-2 bg-purple-500 text-white rounded-md"
                    @click="callAgain('กำลังซักประวัติ')"
                  >
                    เรียกซ้ำคิวปัจจุบัน
                  </button>
                </div>
                <div class="flex">
                  <button
                    class="text-[14px] px-4 py-2 border border-orange-500 bg-orange-50 rounded-md"
                    @click="changeStatus('กำลังซักประวัติ', true)"
                  >
                    ข้ามคิว
                  </button>
                  <button
                    class="text-[14px] px-4 py-2 border border-purple-500 bg-purple-50 rounded-md"
                    @click="callSkip('กำลังซักประวัติ')"
                  >
                    เรียกคิวที่ถูกข้าม
                  </button>
                </div>
              </div>
            </div>

            <!-- รอตรวจ -->
            <div>
              <div class="border border-black overflow-hidden rounded-md">
                <h2
                  class="text-md font-medium text-center bg-gray-300 border-black border-b p-2"
                >
                  รอตรวจ
                </h2>
                <div class="overflow-auto h-[200px]">
                  <div
                    v-for="item in queueCheck"
                    :key="item.id"
                    class="border-black border-b p-2"
                  >
                    <div class="text-center">{{ item.name }}</div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center mt-3"></div>
            </div>

            <!-- กำลังตรวจ -->
            <div>
              <div class="border border-black overflow-hidden rounded-md">
                <h2
                  class="text-md font-medium text-center bg-gray-300 border-black border-b p-2"
                >
                  กำลังตรวจ
                </h2>
                <div class="overflow-auto h-[200px]">
                  <div
                    v-for="item in queueCheckNow"
                    :key="item.id"
                    class="border-black border-b p-2"
                  >
                    <div class="text-center flex justify-center">
                      {{ item.name }}
                      <button
                        class="w-[20px] h-[20px] bg-red-400 flex items-center justify-center text-white rounded-full"
                        @click="deleteQueue(item)"
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-3">
                <div class="flex">
                  <button
                    class="text-[14px] px-4 py-2 bg-orange-500 text-white rounded-md"
                    @click="changeStatus('กำลังตรวจ', false)"
                  >
                    เรียกคิวถัดไป
                  </button>
                  <button
                    class="text-[14px] px-4 py-2 bg-purple-500 text-white rounded-md"
                    @click="callAgain('กำลังตรวจ')"
                  >
                    เรียกซ้ำคิวปัจจุบัน
                  </button>
                </div>
                <div class="flex">
                  <button
                    class="text-[14px] px-4 py-2 border border-orange-500 bg-orange-50 rounded-md"
                    @click="changeStatus('กำลังตรวจ', true)"
                  >
                    ข้ามคิว
                  </button>
                  <button
                    class="text-[14px] px-4 py-2 border border-purple-500 bg-purple-50 rounded-md"
                    @click="callSkip('กำลังตรวจ')"
                  >
                    เรียกคิวที่ถูกข้าม
                  </button>
                </div>
              </div>
            </div>

            <!-- คิวที่ถูกข้าม -->
            <div>
              <div class="border border-black overflow-hidden rounded-md">
                <h2
                  class="text-md font-medium text-center bg-gray-300 border-black border-b p-2"
                >
                  คิวที่ถูกข้าม
                </h2>
                <div class="overflow-auto h-[200px]">
                  <div
                    v-for="item in queueSkip"
                    :key="item.id"
                    class="border-black border-b p-2 flex justify-around"
                  >
                    <div class="flex-1 text-center">
                      {{ item.name }}
                    </div>
                    <div class="flex-1 text-center">
                      {{ item.status }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center mt-3"></div>
            </div>

            <!-- คิวที่สำเร็จ -->
            <div>
              <div class="border border-black overflow-hidden rounded-md">
                <h2
                  class="text-md font-medium text-center bg-gray-300 border-black border-b p-2"
                >
                  คิวที่สำเร็จ
                </h2>
                <div class="overflow-auto h-[200px]">
                  <div
                    v-for="item in queueSuccess"
                    :key="item.id"
                    class="border-black border-b p-2"
                  >
                    <div class="text-center">{{ item.name }}</div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center mt-3"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div
          class="rounded-lg flex bg-blue-100 border-2 border-blue-600 p-2 h-[510px]"
        >
          <div class="p-4 w-1/2">
            <div class="font-medium text-xl text-center mb-4">
              คิวซักประวัติปัจจุบัน
            </div>
            <div>
              <div
                v-for="item in queueQuery"
                :key="item.id"
                class="flex items-center justify-center border p-2 bg-white rounded-lg"
              >
                <span>ซักประวัติโต๊ะ {{ item.room }}</span>
                <span
                  class="ml-3 py-1 px-5 bg-orange-600 rounded-xl text-white"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
          <div
            class="w-1/2 rounded-lg bg-white p-2 max-h-[491.5px] overflow-auto"
          >
            <div class="grid grid-cols-2 overflow-auto gap-3">
              <div
                v-for="item in queueWaiting"
                :key="item.id"
                class="border py-1 flex items-center justify-center bg-gray-100 rounded-lg"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="rounded-lg flex bg-green-100 border-2 border-green-600 p-2 h-[510px]"
        >
          <div class="p-4 w-1/2">
            <div class="font-medium text-xl text-center mb-4">
              คิวตรวจปัจจุบัน
            </div>
            <div>
              <div
                v-for="item in queueCheckNow"
                :key="item.id"
                class="flex items-center justify-center border p-2 bg-white rounded-lg"
              >
                <span>ห้องตรวจ {{ item.room }}</span>
                <span
                  class="ml-3 py-1 px-5 bg-orange-600 rounded-xl text-white"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
          <div
            class="w-1/2 rounded-lg bg-white p-2 max-h-[491.5px] overflow-auto"
          >
            <div class="grid grid-cols-2 overflow-auto gap-3">
              <div
                v-for="item in queueCheck"
                :key="item.id"
                class="border py-1 flex items-center justify-center bg-gray-100 rounded-lg"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// รายการผู้ใช้เริ่มต้น
const users = ref([]);

// คิวของผู้ใช้
const currentUser = ref([]);

const queueWaiting = computed(() => {
  return users.value.filter(
    (user) => user.status === "รอซักประวัติ" && !user.skip
  );
});

const queueQuery = computed(() => {
  return users.value.filter(
    (user) => user.status === "กำลังซักประวัติ" && !user.skip
  );
});

const queueCheck = computed(() => {
  return users.value.filter((user) => user.status === "รอตรวจ" && !user.skip);
});

const queueCheckNow = computed(() => {
  return users.value.filter(
    (user) => user.status === "กำลังตรวจ" && !user.skip
  );
});

const queueSkip = computed(() => {
  return users.value.filter((user) => user.skip === true);
});

const queueSuccess = computed(() => {
  return users.value.filter(
    (user) => user.status === "คิวที่สำเร็จ" && !user.skip
  );
});

// set interval create user mock data every 10 seconds
onMounted(() => {
  setInterval(() => {
    fetchUsers();
  }, 20000);
});

const fetchUsers = async () => {
  const user = {
    id: users.value.length + 1,
    name: `D${users.value.length + 1}`,
    room: Math.floor(Math.random() * 10),
    status: "รอซักประวัติ",
    skip: false,
  };
  users.value.push(user);

  // sort user by id asc
  users.value.sort((a, b) => a.id - b.id);
};

// เพิ่มผู้ใช้ในคิว
const changeStatus = (status, isSkip = false) => {
  // หาผู้ใช้ที่มี status รอซักประวัติ ที่มี id น้อยที่สุด และเปลี่ยน status เป็น กำลังซักประวัติ
  users.value.sort((a, b) => a.id - b.id);

  let checkUser = users.value.find(
    (user) => user.status === status && !user.skip
  );
  switch (status) {
    case "กำลังซักประวัติ":
      if (checkUser && !isSkip) {
        checkUser.status = "รอตรวจ";
      } else if (checkUser && isSkip) {
        checkUser.skip = true;
      }

      const userWaiting = users.value.find(
        (user) => user.status === "รอซักประวัติ" && !user.skip
      );
      if (userWaiting && !isSkip) {
        userWaiting.status = "กำลังซักประวัติ";
        callUser("โต๊ะซักประวัติ", userWaiting);
      }
      break;

    case "กำลังตรวจ":
      if (checkUser && !isSkip) {
        checkUser.status = "คิวที่สำเร็จ";
      } else if (checkUser && isSkip) {
        checkUser.skip = true;
      }

      const userCheck = users.value.find(
        (user) => user.status === "รอตรวจ" && !user.skip
      );
      if (userCheck && !isSkip) {
        userCheck.status = status;
        callUser("ห้องตรวจ", userCheck);
      }
      break;
  }
};

// ฟังก์ชันเรียกผู้ใช้อีกครั้ง
const callAgain = (status) => {
  const userCheck = users.value.find(
    (user) => user.status === status && !user.skip
  );

  if (userCheck && status === "กำลังซักประวัติ") {
    callUser("โต๊ะซักประวัติ", userCheck);
  } else if (userCheck && status === "กำลังตรวจ") {
    callUser("ห้องตรวจ", userCheck);
  }
};

// ฟังก์ชันเรียกผู้ใช้อที่ถูกข้าม
const callSkip = (status) => {
  // check คิวปัจจุบัน ถ้ามีให้ย้ายไป step ถัดไป
  const userCheckNow = users.value.find(
    (user) => user.status === status && !user.skip
  );
  if (userCheckNow) {
    if (status === "กำลังซักประวัติ") {
      userCheckNow.status = "รอตรวจ";
    } else if (status === "กำลังตรวจ") {
      userCheckNow.status = "คิวที่สำเร็จ";
    }
  }

  // หาคิดที่ถูกข้าม
  const userCheck = users.value.find(
    (user) => user.status === status && user.skip
  );
  if (userCheck && status === "กำลังซักประวัติ") {
    userCheck.skip = false;
    callUser("โต๊ะซักประวัติ", userCheck);
  } else if (userCheck && status === "กำลังตรวจ") {
    userCheck.skip = false;
    callUser("ห้องตรวจ", userCheck);
  }
};

// ฟังก์ชันข้ามผู้ใช้
const skipUser = (status) => {
  const userCheck = users.value.find(
    (user) => user.status === status && !user.skip
  );

  if (userCheck) {
    userCheck.skip = true;
  }
};

// ฟังก์ชันลบผู้ใช้
const deleteQueue = (user) => {
  const item = users.value.find((item) => item.id === user.id);

  if (item?.status == "กำลังซักประวัติ") {
    item.status = "รอซักประวัติ";
  } else if (item?.status == "กำลังตรวจ") {
    item.status = "รอตรวจ";
  }
};

// ฟังก์ชันเรียกผู้ใช้
const callUser = async (type, user) => {
  const synth = window.speechSynthesis;

  if (!synth) {
    alert("Speech Synthesis API ไม่รองรับในเบราว์เซอร์นี้");
    return;
  }

  currentUser.value.push(user);

  await new Promise((resolve) => {
    // เพิ่ม space ระหว่างข้อความ
    const name = user.name.split("").join("  ");
    const text = `ขอเชิญหมายเลข ${name} ที่ ${type} ${user.room}`;
    console.log(text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1; // 0 ถึง1 เป็นระดับความดัง
    utterance.rate = 0.3; // 0.1 ถึง 10 อัตราเร็วของการพูด
    utterance.pitch = 1; //0 ถึง 2 // ลักษณะระดับเสียงสูงต่ำ
    utterance.lang = "th-TH";
    synth.speak(utterance);

    utterance.onend = () => {
      setTimeout(resolve, 1000); // เพิ่มเวลา 1 วินาทีระหว่างการเรียกแต่ละครั้ง
    };
  });

  currentUser.value.shift();
};

// ฟังก์ชันข้ามผู้ใช้ และหยุดเรียก
const clear = () => {
  const synth = window.speechSynthesis;
  synth.cancel();
};
</script>

<style scoped>
ul,
ol {
  padding: 0;
  list-style: none;
}

li {
  margin: 5px 0;
}

button {
  margin-left: 10px;
}
</style>
