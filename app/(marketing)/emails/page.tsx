"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { getEmails } from "@/server/emails/getemails";
import { Emails } from "@/schema/email";
import Loading from "@/components/Loading";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email_id = searchParams.get("id");

  const [isPending, startTransition] = useTransition();
  const [isPending2, startTransition2] = useTransition();

  type EmailsWithCv = Emails & { cv_name?: string | null };
  const [emails_array, setEmailsArray] = useState<EmailsWithCv[]>([]);
  const [loadMore,setLoadMore] = useState(true);

  useEffect(() => {
    startTransition(async () => {
      const data = await getEmails();
      if (data.success) {
        setEmailsArray(data.result);
      }
    });
  }, []);

  const fetchMore = () => {
    if(emails_array.length % 10 !== 0) return setLoadMore(false);
    startTransition2(async () => {
      const data = await getEmails(emails_array[emails_array.length - 1].id);
      if(data.result.length < 10) return setLoadMore(false);
      if (data.result) {
        setEmailsArray((prev) => {
          const array = [...prev, ...data.result];
          return array;
        });
      }
    });
  };

  const selectedEmail = useMemo<EmailsWithCv | null>(() => {
    if (!email_id) return null;
    return emails_array.find((item) => item.id === Number(email_id)) || null;
  }, [email_id, emails_array]);

  const truncate = (text: string, max = 120) => {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max)}…` : text;
  };

  if (isPending) return <Loading />;
  return (
    <div className="min-h-screen pt-30">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left: Inbox list */}
          <section className="md:col-span-5 bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col h-[75vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600" />
                <h2 className="text-sm font-semibold text-gray-900">Sent</h2>
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {emails_array.length}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y">
                {emails_array.map((result) => {
                  const isSelected = selectedEmail?.id === result.id;
                  const initial = (result.recipient?.[0] || "E").toUpperCase();
                  return (
                    <li key={result.id}>
                      <button
                        type="button"
                        onClick={() => router.push(`?id=${result.id}`)}
                        className={`group cursor-pointer w-full text-left px-3 py-2.5 focus:outline-none transition-colors ${
                          isSelected
                            ? "bg-blue-50/70 ring-1 ring-inset ring-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                        aria-current={isSelected ? "true" : undefined}
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm text-sm">
                            {initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <h3 className="font-medium text-gray-900 truncate text-sm">
                                {result.subject}
                              </h3>
                            </div>
                            <p className="text-[13px] text-gray-500 truncate">{result.recipient}</p>
                            <p className="mt-0.5 text-[13px] text-gray-600">{truncate(result.body)}</p>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="px-4 py-3 border-t bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky bottom-0">
              <button
                onClick={fetchMore}
                disabled={isPending2 || emails_array.length < 10 || !loadMore}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 bg-white border hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`h-4 w-4 ${isPending2 ? "animate-bounce" : ""}`}
                >
                  <path fillRule="evenodd" d="M11.47 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 01-1.06 1.06L12.75 6.81v13.44a.75.75 0 01-1.5 0V6.81L4.03 12.53a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                </svg>
                {isPending2 ? "Loading..." : "Load more"}
              </button>
            </div>
          </section>

          {/* Right: Reader */}
          <section className="md:col-span-7 bg-white border rounded-xl shadow-sm p-5 h-[75vh] overflow-y-auto">
            {selectedEmail ? (
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {selectedEmail.subject}
                  </h1>
                  <div className="mt-1 flex items-center gap-2 text-[13px] text-gray-600 flex-wrap">
                    <span>{selectedEmail.recipient}</span>
                    {selectedEmail?.cv_name ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border text-[12px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M4.5 5.25A2.25 2.25 0 016.75 3h7.5A2.25 2.25 0 0116.5 5.25v13.5A2.25 2.25 0 0114.25 21h-7.5A2.25 2.25 0 014.5 18.75V5.25zm3 1.5a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zM7.5 10.5a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zM7.5 14.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                        </svg>
                        CV: {selectedEmail.cv_name}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="text-gray-800 leading-6 whitespace-pre-wrap text-[15px]">
                  {selectedEmail.body}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="mx-auto mb-4 h-12 w-12 relative">
                    <Image
                      src="/gmail_icon.png"
                      alt="No email selected"
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base font-medium text-gray-900">No email selected</h3>
                  <p className="mt-1 text-[13px] text-gray-500">
                    Choose an email from the list to read it here.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Page
