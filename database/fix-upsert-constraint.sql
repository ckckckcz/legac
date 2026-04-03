-- Add the missing UNIQUE constraint required by the CLI upsert function
ALTER TABLE documentation_pages
ADD CONSTRAINT ux_documentation_pages_doc_slug UNIQUE (documentation_id, slug);
