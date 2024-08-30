import RemoveStudent from "@/components/Modals/RemoveStudent";
import StudentList from "@/components/StudentList/StudentList";

type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
};

export default function Home() {
  // Query List of Student

  return (
    <main>
      <StudentList />
    </main>
  );
}
