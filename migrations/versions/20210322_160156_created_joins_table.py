"""created joins table

Revision ID: 595f04025c16
Revises: 26ef616b8cc1
Create Date: 2021-03-22 16:01:56.034780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '595f04025c16'
down_revision = '26ef616b8cc1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('feeds_sources',
                    sa.Column('feed_id', sa.Integer(), nullable=False),
                    sa.Column('source_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['feed_id'], ['feeds.id'], ),
                    sa.ForeignKeyConstraint(['source_id'], ['sources.id'], ),
                    sa.PrimaryKeyConstraint('feed_id', 'source_id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('feeds_sources')
    # ### end Alembic commands ###