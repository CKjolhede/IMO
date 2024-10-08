"""empty message

Revision ID: bded5a9c00b9
Revises: 40c0edf39eb8
Create Date: 2024-08-15 14:18:49.570217

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bded5a9c00b9'
down_revision = '40c0edf39eb8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('follows', schema=None) as batch_op:
        batch_op.drop_constraint('unique_follow', type_='unique')

    with op.batch_alter_table('movies', schema=None) as batch_op:
        batch_op.alter_column('overview',
            existing_type=sa.TEXT(),
            nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('movies', schema=None) as batch_op:
        batch_op.alter_column('overview',
            existing_type=sa.TEXT(),
            nullable=False)

    with op.batch_alter_table('follows', schema=None) as batch_op:
        batch_op.create_unique_constraint('unique_follow', ['follower_id', 'following_id'])

    # ### end Alembic commands ###
