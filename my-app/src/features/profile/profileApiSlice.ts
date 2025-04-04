import apiSlice from "../../lib/apiSlice";

const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadFile: builder.mutation<{imgUrl: string}, FormData>({
            query: (formData) => ({
                url: '/file/upload',
                method: 'POST',
                body: formData
            })
        }),
        changeDisplayPicture: builder.mutation<{imgUrl: string}, {googleId: string, imgUrl: string}>({
            query: ({googleId, imgUrl}) => ({
                url: '/user/change/dp',
                method: 'POST',
                body: {googleId, imgUrl}
            })
        })
    })
})

export const { useUploadFileMutation, useChangeDisplayPictureMutation } = profileApiSlice