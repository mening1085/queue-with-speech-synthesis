import { H3Event } from "h3";

interface TTSResponse {
  body: any;
}

export default defineEventHandler(
  async (event: H3Event): Promise<TTSResponse> => {
    const body = await readBody(event); // อ่านข้อมูลจาก client (ข้อความที่ต้องการแปลง)

    const { text } = body;

    if (!text) {
      throw createError({
        statusCode: 400,
        message: "Text is required",
      });
    }

    return text;

    // ส่งคำขอไปยัง Coqui TTS Server
    const response: any = await $fetch("/api/tts", {
      baseURL: "http://localhost:5002",
      method: "POST",
      body: {
        text, // ข้อความที่ต้องการแปลงเป็นเสียง
      },
    });

    return response;
  }
);
