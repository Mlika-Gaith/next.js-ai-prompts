import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found.", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();

    const existsPrompt = await Prompt.findById(params.id);
    if (!existsPrompt)
      return new Response("Prompt with ${params.id} not found.", {
        status: 404,
      });
    existsPrompt.prompt = prompt;
    existsPrompt.tag = tag;
    await existsPrompt.save();
    return new Response("Prompt with ${params.id} updated.", { status: 200 });
  } catch (error) {
    return new Response("Error updating prompt.", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt with id ${params.id} deleted.", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error deleting prompt.", { status: 500 });
  }
};
