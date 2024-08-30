import StudentList from "@/components/StudentList/StudentList";
import { cookieBasedClient } from "@/utils/amplifyServer";

import { runWithAmplifyServerContext } from "@/utils/amplifyServer";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

import { listStudents } from "@/graphql/queries";
import { redirect } from "next/navigation";
import { Student } from "@/types/types";

export default async function Home() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });

    const { data } = (await cookieBasedClient.graphql({
      query: listStudents,
    })) as { data: { listStudents: Student[] } };

    return (
      <main>
        <StudentList students={data.listStudents} />
      </main>
    );
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
