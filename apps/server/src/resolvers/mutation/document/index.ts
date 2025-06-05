import DATA_BASE from '@/db';
import type { IResolvers } from 'mercurius';

export const updateDocument: NonNullable<IResolvers['Mutation']>['updateDocument'] = async ({ }, { input }, { pubsub }) => {
    const { title, description } = input;

    try {
        await DATA_BASE.update(({ document }) => {
            document.title = title;
            document.description = description;
            DATA_BASE.write();
        });
        pubsub.publish({
            topic: 'DOCUMENT_UPDATED',
            payload: {
                documentUpdated: DATA_BASE.data.document
            },
        });
        return DATA_BASE.data.document;
    } catch (error) {
        console.error("Error updating document:", error);
        throw new Error("Failed to update document");
    }
}