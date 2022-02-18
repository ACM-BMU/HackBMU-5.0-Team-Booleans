import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def check_plagiarism(token,thres_hold):
    student_files = [doc for doc in os.listdir(token) if doc.endswith('.txt')]
    print(student_files)
    for i in range(len(student_files)):
        file = os.path.join(token,student_files[i])
        student_files[i]=file
    print(student_files)
    # student_files.append("files\john.txt")
    student_notes = [open(_file, encoding='utf-8', errors='ignore').read()
                    for _file in student_files]



    def vectorize(Text): return TfidfVectorizer().fit_transform(Text).toarray()
    def similarity(doc1, doc2): return cosine_similarity([doc1, doc2])


    vectors = vectorize(student_notes)
    s_vectors = list(zip(student_files, vectors))
    plagiarism_results = set()
    # global s_vectors
    for student_a, text_vector_a in s_vectors:
        new_vectors = s_vectors.copy()
        current_index = new_vectors.index((student_a, text_vector_a))
        del new_vectors[current_index]
        for student_b, text_vector_b in new_vectors:
            sim_score = similarity(text_vector_a, text_vector_b)[0][1]
            #setting the threshold
            if sim_score<(thres_hold/100):
                continue

            student_pair = sorted((student_a, student_b))

            try:
                temp1 = student_pair[0].split("/",1)
                res1 = temp1[1].split(".",1)
                temp2 = student_pair[1].split("/",1)
                res2 = temp2[1].split(".",1)        
            except:
                res1 = student_pair[0]
                res2 = student_pair[1]

            score = (res1[0], res2[0], (sim_score*100))
            plagiarism_results.add(score)
    return plagiarism_results

set = check_plagiarism("assignment")
res = dict.fromkeys(set, 0)
print(res)